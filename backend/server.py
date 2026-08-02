from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
import asyncio
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend setup
resend.api_key = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')

app = FastAPI()
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---- Models ----
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    message: str
    created_at: str
    email_sent: bool

class BlogArticle(BaseModel):
    id: str
    title: str
    excerpt: str
    content: str
    image_url: str
    category: str
    read_time: str
    created_at: str

class BlogArticleCreate(BaseModel):
    title: str
    excerpt: str
    content: str
    image_url: str
    category: str
    read_time: str


# ---- Routes ----
@api_router.get("/")
async def root():
    return {"message": "Filmmaking Workshop API"}

@api_router.get("/health")
async def health():
    return {"status": "ok"}


# Contact endpoint with Resend email
@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(form: ContactForm):
    contact_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    
    doc = {
        "id": contact_id,
        "name": form.name,
        "email": form.email,
        "message": form.message,
        "created_at": now,
        "email_sent": False
    }
    
    # Save to MongoDB
    await db.contacts.insert_one(doc)
    
    # Send email via Resend
    email_sent = False
    try:
        html_content = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C6A87C;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Message:</strong></p>
            <p style="background: #F7F5F2; padding: 16px; border-radius: 8px;">{form.message}</p>
        </div>
        """
        params = {
            "from": SENDER_EMAIL,
            "to": [form.email],
            "subject": f"Thank you for reaching out, {form.name}!",
            "html": html_content
        }
        await asyncio.to_thread(resend.Emails.send, params)
        email_sent = True
        await db.contacts.update_one({"id": contact_id}, {"$set": {"email_sent": True}})
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")

    return ContactResponse(
        id=contact_id,
        name=form.name,
        email=form.email,
        message=form.message,
        created_at=now,
        email_sent=email_sent
    )


# Blog endpoints
@api_router.get("/blog", response_model=List[BlogArticle])
async def get_blog_articles():
    articles = await db.blog_articles.find({}, {"_id": 0}).sort("created_at", -1).to_list(100)
    return articles

@api_router.get("/blog/{article_id}", response_model=BlogArticle)
async def get_blog_article(article_id: str):
    article = await db.blog_articles.find_one({"id": article_id}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article

@api_router.post("/blog", response_model=BlogArticle)
async def create_blog_article(article: BlogArticleCreate):
    article_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    doc = {
        "id": article_id,
        **article.model_dump(),
        "created_at": now
    }
    await db.blog_articles.insert_one(doc)
    return BlogArticle(id=article_id, **article.model_dump(), created_at=now)


# Seed blog articles on startup
async def seed_blog_articles():
    count = await db.blog_articles.count_documents({})
    if count == 0:
        articles = [
            {
                "id": str(uuid.uuid4()),
                "title": "The Art of Cinematic Storytelling",
                "excerpt": "Discover how to craft narratives that captivate audiences from the first frame to the last. Learn the principles that separate amateur films from professional cinema.",
                "content": "Cinematic storytelling is more than just pointing a camera...",
                "image_url": "https://images.unsplash.com/photo-1555872878-86c9fe52a0da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2luZW1hJTIwY2FtZXJhJTIwbGVuc3xlbnwwfHx8fDE3NzYyNDQ0OTl8MA&ixlib=rb-4.1.0&q=85",
                "category": "Storytelling",
                "read_time": "8 min read",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Mastering Natural Light in Film",
                "excerpt": "Natural light can be your most powerful tool. Here's how to harness golden hour, overcast skies, and window light to create stunning visuals without expensive gear.",
                "content": "Natural light is the filmmaker's best friend...",
                "image_url": "https://images.unsplash.com/photo-1769699167704-33f5c2bbf3e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmaWxtJTIwc2V0JTIwbGlnaHRpbmd8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85",
                "category": "Cinematography",
                "read_time": "6 min read",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Building Your First Short Film on a Budget",
                "excerpt": "You don't need a Hollywood budget to make something beautiful. Learn how to plan, shoot, and edit a compelling short film with minimal resources.",
                "content": "Every great filmmaker started with limited resources...",
                "image_url": "https://images.unsplash.com/photo-1695192655920-00dfc0c1ea22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85",
                "category": "Production",
                "read_time": "10 min read",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Color Grading: From Good to Cinematic",
                "excerpt": "Color grading transforms footage from ordinary to extraordinary. Explore the techniques used in major films and how to apply them to your own projects.",
                "content": "Color grading is where the magic happens in post-production...",
                "image_url": "https://images.unsplash.com/photo-1555872878-86c9fe52a0da?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2luZW1hJTIwY2FtZXJhJTIwbGVuc3xlbnwwfHx8fDE3NzYyNDQ0OTl8MA&ixlib=rb-4.1.0&q=85",
                "category": "Post-Production",
                "read_time": "7 min read",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Sound Design: The Invisible Art",
                "excerpt": "Great sound design is felt, not heard. Learn how to use ambient audio, foley, and music to elevate your films to a professional standard.",
                "content": "Sound design is often the most overlooked aspect of filmmaking...",
                "image_url": "https://images.unsplash.com/photo-1769699167704-33f5c2bbf3e5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA0MTJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBmaWxtJTIwc2V0JTIwbGlnaHRpbmd8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85",
                "category": "Sound",
                "read_time": "5 min read",
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": str(uuid.uuid4()),
                "title": "Finding Your Visual Style as a Filmmaker",
                "excerpt": "Every great director has a signature look. Discover how to develop your unique visual language that sets your work apart from the crowd.",
                "content": "Your visual style is your signature as a filmmaker...",
                "image_url": "https://images.unsplash.com/photo-1695192655920-00dfc0c1ea22?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1OTN8MHwxfHNlYXJjaHw0fHxjaW5lbWF0aWMlMjBmaWxtJTIwZGlyZWN0b3IlMjBiZWhpbmQlMjBzY2VuZXN8ZW58MHx8fHwxNzc2MjQ0NDk5fDA&ixlib=rb-4.1.0&q=85",
                "category": "Direction",
                "read_time": "9 min read",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.blog_articles.insert_many(articles)
        logger.info("Seeded blog articles")


@app.on_event("startup")
async def startup():
    await seed_blog_articles()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)
