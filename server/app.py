from flask import Flask
from pymongo import MongoClient
import pymongo
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

app.config.from_object("config")
client = MongoClient(os.getenv('CONNECTION_STRING'))
db = client['brave_together']

@app.route('/insert_one')
def insertItem():
    collection_name = db["story_tamplate"]
    item = {
    "storyUpload":{
        "mainHeader":{
            "content":"welcome!!",
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
                    "4",
                    "5"
                ]
            }

        

        ]

    }
}
    succ = collection_name.insert_one(item)
    return 'success'

@app.route('/')
def index():

    return 'Hello Story'





#from views import*

if __name__ == '__main__':
    app.run()