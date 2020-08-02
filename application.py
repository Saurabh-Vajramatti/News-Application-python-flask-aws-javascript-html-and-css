from flask import Flask, jsonify, request
import json
import re
import sys
from newsapi import NewsApiClient
application = Flask(__name__)


newsapi = NewsApiClient(api_key='927deed8d93640afa30940d176cc79a0')


# Look inside `static` and serve `index.html`
@application.route('/')
def home_page():
    return application.send_static_file('index.html')


# News Slider
@application.route('/getslide', methods=['GET', 'POST'])
def getSlide():
    all = newsapi.get_top_headlines(page_size=30)
    all_art=all['articles']
    valid_art=[]
    count=0
    for article in all_art:
        if(article['author']!=None and article['description']!=None and article['title']!=None and article['url']!=None and article['urlToImage']!=None and article['publishedAt']!=None and article['source']['id']!= None and article['source']['name']!=None):
            if(article['author']!="" and article['description']!="" and article['title']!="" and article['url']!="" and article['urlToImage']!="" and article['publishedAt']!="" and article['source']['id']!= "" and article['source']['name']!=""):
                if(article['author'].lower()!="null" and article['description'].lower()!="null" and article['title'].lower()!="null" and article['url'].lower()!="null" and article['urlToImage'].lower()!="null" and article['publishedAt'].lower()!="null" and article['source']['id'].lower()!="null" and article['source']['name'].lower()!="null"):
                    count=count+1
                    valid_art.append(article)
                    if(count==5):
                        break
    
    return jsonify({'slide' : valid_art})


# News searched based on keyword, from date, to date and source
@application.route('/getSearchedNews', methods=['GET', 'POST'])
def getSearchedNews():
    if request.method == 'GET':
        newsKeyword=request.args["keyword"]
        newsFrom=request.args["fromDate"]
        newsTo=request.args["toDate"]
        newsSource=request.args["source"]

        #checking for news api exceptions
        try:
            if(newsSource.lower()=="all"):
                newsSearched=newsapi.get_everything(q=newsKeyword, from_param=newsFrom, to=newsTo, language='en', sort_by='publishedAt', page_size=30)    
            else:
                newsSearched=newsapi.get_everything(q=newsKeyword, sources=newsSource,from_param=newsFrom, to=newsTo, language='en', sort_by='publishedAt', page_size=30)
        except :
            messageInfo=str(sys.exc_info()[1])
            messageStartIndex=len(messageInfo)-1
            while(True):
                if(messageInfo[messageStartIndex]==':'):
                    break
                messageStartIndex=messageStartIndex-1
            message=messageInfo[messageStartIndex+3:len(messageInfo)-2]
        
            return jsonify({"newsexception":message})

        searchedArticles=newsSearched['articles']
        validArticles=[]
        for article in searchedArticles:
            if(article['author']!=None and article['description']!=None and article['title']!=None and article['url']!=None and article['urlToImage']!=None and article['publishedAt']!=None and article['source']['id']!= None and article['source']['name']!=None):
                if(article['author']!="" and article['description']!="" and article['title']!="" and article['url']!="" and article['urlToImage']!="" and article['publishedAt']!="" and article['source']['id']!= "" and article['source']['name']!=""):            
                    if(article['author'].lower()!="null" and article['description'].lower()!="null" and article['title'].lower()!="null" and article['url'].lower()!="null" and article['urlToImage'].lower()!="null" and article['publishedAt'].lower()!="null" and article['source']['id'].lower()!="null" and article['source']['name'].lower()!="null"):
                        validArticles.append(article)
        
        if(len(validArticles)>15):
            validArticles=validArticles[0:15]

        return jsonify({'searchedNews':validArticles})

# Getting and sending data to be used for news source dropdown population based on news category selected
@application.route('/getsources', methods=['GET', 'POST'])
def getsources():
    if request.method == 'GET':
        newsCategory=request.args["Category"].lower()
        if(newsCategory.lower()=="all"):
            sources=newsapi.get_sources(language='en',country='us')
        else:    
            sources=newsapi.get_sources(category=newsCategory,language='en',country='us')      
        return jsonify({'newsSources':sources})


# Getting and sending data to be used for CNN news cards on the homepage
@application.route('/getcnn', methods=['GET', 'POST'])
def getcnn():
    all = newsapi.get_top_headlines(page_size=30, sources='cnn')
    all_art=all['articles']
    valid_art=[]
    for article in all_art:
        if(article['author']!=None and article['description']!=None and article['title']!=None and article['url']!=None and article['urlToImage']!=None and article['publishedAt']!=None and article['source']['id']!= None and article['source']['name']!=None):
            if(article['author']!="" and article['description']!="" and article['title']!="" and article['url']!="" and article['urlToImage']!="" and article['publishedAt']!="" and article['source']['id']!= "" and article['source']['name']!=""):
                if(article['author'].lower()!="null" and article['description'].lower()!="null" and article['title'].lower()!="null" and article['url'].lower()!="null" and article['urlToImage'].lower()!="null" and article['publishedAt'].lower()!="null" and article['source']['id'].lower()!="null" and article['source']['name'].lower()!="null"): 
                    valid_art.append(article)
    
    if(len(valid_art)>4):
        valid_art=valid_art[0:4]
    return jsonify({'cnn' : valid_art})


# Getting and sending data to be used for FOX news cards on the homepage
@application.route('/getfox', methods=['GET', 'POST'])
def getfox():
    all = newsapi.get_top_headlines(page_size=30, sources='fox-news')
    all_art=all['articles']
    valid_art=[]
    for article in all_art:
        if(article['author']!=None and article['description']!=None and article['title']!=None and article['url']!=None and article['urlToImage']!=None and article['publishedAt']!=None and article['source']['id']!= None and article['source']['name']!=None):
            if(article['author']!="" and article['description']!="" and article['title']!="" and article['url']!="" and article['urlToImage']!="" and article['publishedAt']!="" and article['source']['id']!= "" and article['source']['name']!=""):
                if(article['author'].lower()!="null" and article['description'].lower()!="null" and article['title'].lower()!="null" and article['url'].lower()!="null" and article['urlToImage'].lower()!="null" and article['publishedAt'].lower()!="null" and article['source']['id'].lower()!="null" and article['source']['name'].lower()!="null"):
                    valid_art.append(article)

    if(len(valid_art)>4):
        valid_art=valid_art[0:4]
    return jsonify({'fox' : valid_art})

# Getting and sending the top 30 frequently occuring noncommon words from the titles of top headlines for word cloud
@application.route('/gettopwords', methods=['GET', 'POST'])
def getTopWords():
    all = newsapi.get_top_headlines(page_size=30)
    titles=[]
    all_art=all['articles']

    for article in all_art:
        titles.append(article['title'])

    wordsInTitles=[]
    for title in titles:
        wordsInTitles=wordsInTitles+re.sub(r"[^\w]", " ", title).split()
    wordFrequencyDictionary={}
    for word in wordsInTitles:
        if(word.lower() in wordFrequencyDictionary):
            wordFrequencyDictionary[word.lower()]=wordFrequencyDictionary[word.lower()]+1
        else:
            wordFrequencyDictionary[word.lower()] = 1

    stopWordsFile = open("stopwords_en.txt")
    for line in stopWordsFile:
        for word in line.split():
            if(word.lower() in wordFrequencyDictionary):
                del wordFrequencyDictionary[word.lower()]

    topThirtyWordFrequencyDictionary={}
    count=0
    
    for key, value in sorted(wordFrequencyDictionary.items(), key=lambda item: item[1],reverse=True):
        count=count+1
        if(count==31):
            break
        topThirtyWordFrequencyDictionary[key]=value

    finalList=[]
    freqTotal=0.0
    for key in topThirtyWordFrequencyDictionary:
        freqTotal=freqTotal+topThirtyWordFrequencyDictionary[key]

    
    for key in topThirtyWordFrequencyDictionary:
        wordSizeDictionary={}
        wordSizeDictionary['word']=key
        if(topThirtyWordFrequencyDictionary[key]<4):
            wordSizeDictionary['size']=str((topThirtyWordFrequencyDictionary[key]/freqTotal)*350)
        elif(topThirtyWordFrequencyDictionary[key]<17):
            wordSizeDictionary['size']=str((topThirtyWordFrequencyDictionary[key]/freqTotal)*160)
        else:
            wordSizeDictionary['size']=str((topThirtyWordFrequencyDictionary[key]/freqTotal)*120)

        if(topThirtyWordFrequencyDictionary[key]==1):
            wordSizeDictionary['size']=str(topThirtyWordFrequencyDictionary[key]*5)
        finalList.append(wordSizeDictionary)

    return jsonify(finalList)

if __name__ == "__main__":
    application.run()
