from flask import Flask, render_template, request, url_for, jsonify
from pymongo import MongoClient
import pymongo
import os
from bson.json_util import dumps
from bson.json_util import loads
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

app.config.from_object("config")
client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['brave_together']
# story_tamplate
# {storyTamplate:[{}]}
# 0:
# label: "כותרת"
# length: "50"
# tag: "input"
# [[Prototype]]: Object
# 1:
# cols: "50"
# label: "תוכן"
# rows: "10"
# tag: "textarea"
# [[Prototype]]: Object
# 2:
# label: "גופן"
# options: (2) ['דוד', 'אריאל']
# tag: "select"
# [[Prototype]]: Object
@app.route('/api/story_tamplate',methods=['GET'])
def getItem():
    collection_name = db["story_tamplate"]
    item = collection_name.find_one({"is_history":{"$exists":False}})
    # print("item",item)
    story_item = loads(dumps(item))
    story_item = story_item['storyUpload']

    return story_item



@app.route('/api/story_tamplate',methods=['POST'])
def insertItem():
    collection_name = db["story_tamplate"]
    item = request.get_json() 
    print("storyUpload",item)
    # if(storyUpload.form)
# item = {
#     "storyUpload":{
#         "mainHeader":{
#             "content":"welcome!!",
#             "color":"white",
#             "fontSize":"14vh"
#         }
#         ,
#         "form":[
#             {
#                 "label":"כותרת",
#                 "tag":"input",
#                 "type":"text"
#             },{
#                 "label":"תוכן",
#                 "tag":"textarea",
#                 "rows":"4",
#                 "cols":"50"
#             },
#             {
#                 "label":"תגיות",
#                 "tag":"input",
#                 "type":"text"
#             },
#             {
#                 "label":"קטגוריה",
#                 "tag" :"select",
#                 "options":[
#                     "1",
#                     "2",
#                     "3",
#                     "4",
#                     "5"
#                 ]
#             }

        

#         ]

#     }
    collection_name.update_many({},{"$set":{"is_history":True}})
# } 
    succ = collection_name.insert_one(item)
    print(succ)
    return {"success":True}


@app.route('/api/create_collection',methods=['POST'])
def createCollection():
    # collection_name = db["collection"]
    # item = request.get_json()



    
@app.route('/api/story_body',methods=['POST'])
def insertStory():
    collection_name = db["story_body"]
    item = request.get_json()
    print("storyBody",item)
    item["id"] = collection_name.find({}).count()+1
    item["qoute"] = []
    item["author"] = "Maayan"
    item["story_img"] = "src/to/img"


    collection_name.insert_one(item)
    ##call mizad hagvora api


    # {
    #      "title" : "story_title1",
    #      "description" : "short_description",
    #      "text" : "text_description",
    #      "date" : "2021-12-31",
    #      "tags":["tag_1","tag_2","tag_3"], 
    #      "country": "country"
         
    #  }

    # print(collection_name.insert_one(item))
    return {"success":True}

@app.route('/api/story_quote',methods=['POST'])
def insertQuote():
    collection_name = db["story_body"]
    item = request.get_json()
    print(item)
    res = collection_name.update_one({"id":item["id"]},{'$push':{"qoute":{"text":item["qoute"],"share":0}}})
    print(res)
    return {"success":True}
    




@app.route('/api/story_body',methods=['GET'])
def getStory():
    output = []
    collection_name = db["story_body"]
    # print("storyBody",item)
    storyArr = collection_name.find({})
    ##call mizad hagvora api
    for data in storyArr:
        data['_id'] = dumps(['_id'])
        del data['_id']

        print(data)
        output.insert(1,data)

    # storyArr = loads(dumps(storyArr))
    # print((dumps(storyArr)))
    # print(collection_name.insert_one(item))
    # return jsonify(storyArr)
    return {"data": output}



@app.route('/')
def index():

    return 'Hello Story'





#from views import*

if __name__ == '__main__':
    app.run()