from flask import Flask,render_template,request,jsonify
import joblib
import pandas as pd
import re
from sklearn.metrics.pairwise import cosine_similarity
def clean_text(text):
    text = str(text)
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

vec=joblib.load('tfidf_vectorizer.pkl')
df=joblib.load('faq_data.pkl')
df["Question"] = df["Question"].apply(clean_text)
QA=vec.transform(df["Question"])
answers=df["Answer"]
app=Flask(__name__)
@app.route('/')
def index():
    return render_template('index.html')
@app.route('/medical',methods=['POST'])
def answer():
    question=request.json['question']
    print(question)
    question=clean_text(question)
    question=vec.transform([question])
    value=cosine_similarity(question,QA)[0]
    position=value.argmax()
    result=answers.iloc[position]
    print(result)
    return jsonify({'data': result})
if __name__ == '__main__':
    app.run(debug=True)

