import requests
import xml.etree.ElementTree as ET
import sys

def fetch_rss_headlines(url="https://feeds.bbci.co.uk/news/rss.xml"):
    print(f"Fetching headlines from {url}...")
    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        root = ET.fromstring(response.content)
        
        # RSS structure: <rss><channel><item><title>...
        items = root.findall('.//item')
        
        if not items:
            print("No news items found.")
            return

        print("\nLatest Headlines:")
        for idx, item in enumerate(items[:10], 1): # Show top 10
            title = item.find('title').text
            print(f"{idx}. {title}")
            
    except Exception as e:
        print(f"Error fetching RSS: {e}")

if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "https://feeds.bbci.co.uk/news/rss.xml"
    fetch_rss_headlines(url)
