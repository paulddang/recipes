import webbrowser
import cgi

form = cgi.FieldStorage()
search_query = form.getvalue('query')

def google_search(query):
    search_url = "https://www.google.com/search?q=" + query
    webbrowser.open(search_url)

# Perform the search
if search_query:
    google_search(search_query)