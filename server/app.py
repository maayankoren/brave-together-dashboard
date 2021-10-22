from flask import Flask
from pymongo import MongoClient
import pymongo
app = Flask(__name__)

app.config.from_object("config")


@app.route('/')
def index():

    CONNECTION_STRING = "mongodb+srv://admin:9WxI96T8baPlnBRW@cluster0.0qv9t.mongodb.net/brave_together?retryWrites=true&w=majority"
    client = MongoClient(CONNECTION_STRING)
    db = client['brave_together']
    collection_name = db["story_tamplate"]
    item = {
    "storyUpload":{
        "mainHeader":{
            "content":"welcome",
            "color":"white",
            "fontSize":"14vh"
        }
        ,
        "form":[
            {
                "label":"כותרת",
                "tag":"input",
                "type":"text"
            },{
                "label":"תוכן",
                "tag":"textarea",
                "rows":"4",
                "cols":"50"
            },
            {
                "label":"תגיות",
                "tag":"input",
                "type":"text"
            },
            {
                "label":"קטגוריה",
                "tag" :"select",
                "options":[
                    "1",
                    "2",
                    "3",
                    "4"
                ]
            }

        

        ]

    }
}
    insert = collection_name.insert_one(item)
    return 'Hello Story'





#from views import*

if __name__ == '__main__':
    app.run()