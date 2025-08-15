#!/usr/bin/env python
# coding: utf-8

# In[48]:


import pandas as pd   


# In[49]:


df=pd.read_csv("train.csv")
df


# In[50]:


df.info()


# In[51]:


from sklearn.model_selection import train_test_split


# In[52]:


from sklearn.feature_extraction.text import TfidfVectorizer


# In[53]:


x=df["Question"]
y=df["Answer"]
x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=0.3,random_state=42)


# In[54]:


vec=TfidfVectorizer()
xTrain_vec=vec.fit_transform(x_train)
xTest_vec=vec.transform(x_test)


# In[55]:


from sklearn.metrics.pairwise import cosine_similarity


# In[56]:


i=0
result=[]
for test in xTest_vec :
    value=cosine_similarity(test,xTrain_vec)[0]
    position=value.argmax()

    result.append({
        "question":x_test.iloc[i],
        "prediction":y_train.iloc[position],
        "the right":y_test.iloc[i],
        "score":value
    })
    i=i+1
result=pd.DataFrame(result)
print(result)    



# In[57]:


result.head()


# In[58]:


result.to_csv("results.csv", index=False)


# In[59]:


result.tail()


# In[60]:


import re
def clean_text(text):
    text = str(text)
    text = text.lower()
    text = re.sub(r'[^\w\s]', '', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text



# In[61]:


df["Question"] = df["Question"].apply(clean_text)
question=vec.transform(df["Question"])
answers=df["Answer"]
def answer(qes):
    qes=clean_text(qes)
    qes=vec.transform([qes])
    value=cosine_similarity(qes,question)[0]
    pos=value.argmax()
    print("the answer is :", answers.iloc[pos])
    print(value)


# In[62]:


answer("Can pregnant women pass LCM to their fetus?")


# In[63]:


answer(["what is diabetes?"])


# In[64]:


answer(["what is the insulin?"])


# In[ ]:


get_ipython().system('jupyter nbconvert --to script model.ipynb')

