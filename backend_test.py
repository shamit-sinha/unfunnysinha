import requests
import sys
import json
from datetime import datetime

class UnfunnySinhaAPITester:
    def __init__(self, base_url="https://premium-course-3.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/api/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")

            self.results.append({
                'test': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': response.status_code,
                'success': success,
                'response_preview': response.text[:200] if not success else "OK"
            })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.results.append({
                'test': name,
                'method': method,
                'endpoint': endpoint,
                'expected_status': expected_status,
                'actual_status': 'ERROR',
                'success': False,
                'response_preview': str(e)
            })
            return False, {}

    def test_health_check(self):
        """Test API health endpoint"""
        return self.run_test("Health Check", "GET", "health", 200)

    def test_root_endpoint(self):
        """Test API root endpoint"""
        return self.run_test("Root Endpoint", "GET", "", 200)

    def test_blog_articles(self):
        """Test blog articles endpoint"""
        success, response = self.run_test("Blog Articles", "GET", "blog", 200)
        if success and isinstance(response, list):
            print(f"   Found {len(response)} articles")
            if len(response) >= 6:
                print("✅ Expected 6 seeded articles found")
            else:
                print(f"⚠️  Expected 6 articles, found {len(response)}")
        return success

    def test_contact_form(self):
        """Test contact form submission"""
        test_data = {
            "name": "Test User",
            "email": "test@example.com",
            "message": "This is a test message from the automated testing suite."
        }
        success, response = self.run_test("Contact Form", "POST", "contact", 200, test_data)
        if success:
            if 'id' in response and 'email_sent' in response:
                print(f"✅ Contact form response includes required fields")
                print(f"   Contact ID: {response.get('id')}")
                print(f"   Email sent: {response.get('email_sent')}")
            else:
                print(f"⚠️  Response missing expected fields: {response}")
        return success

def main():
    print("🚀 Starting Unfunny Sinha API Testing...")
    print("=" * 50)
    
    tester = UnfunnySinhaAPITester()
    
    # Run all tests
    print("\n📋 Running Backend API Tests:")
    tester.test_health_check()
    tester.test_root_endpoint()
    tester.test_blog_articles()
    tester.test_contact_form()

    # Print summary
    print("\n" + "=" * 50)
    print(f"📊 Test Results Summary:")
    print(f"   Tests Run: {tester.tests_run}")
    print(f"   Tests Passed: {tester.tests_passed}")
    print(f"   Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Print failed tests
    failed_tests = [r for r in tester.results if not r['success']]
    if failed_tests:
        print(f"\n❌ Failed Tests ({len(failed_tests)}):")
        for test in failed_tests:
            print(f"   - {test['test']}: {test['actual_status']} (expected {test['expected_status']})")
            print(f"     {test['response_preview']}")
    
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())