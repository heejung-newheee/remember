from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://sparta:test@cluster0.kfctdln.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/members', methods=['GET'])
def members_get():
   all_members = list(db.members.find({},{'_id':False}))
#    print(all_members)
   return jsonify({'result':all_members, 'msg': '목록 조회 완료'})

@app.route('/members', methods=['POST'])
def members_post():
    name_receive = request.form['name_give']
    position_receive = request.form['position_give']
    mbti_receive = request.form['mbti_give']
    hobby_receive = request.form['hobby_give']
    email_receive = request.form['email_give']
    git_receive = request.form['git_give']
    blog_receive = request.form['blog_give']
    img_receive = request.form['img_give']

    doc = {
        'name': name_receive,
        'position':position_receive,
        'mbti':mbti_receive,
        'hobby':hobby_receive,
        'email':email_receive,
        'git':git_receive,
        'blog':blog_receive,
        'img':img_receive
    }

    db.members.insert_one(doc)

    return jsonify({'result':'success', 'msg': '멤버 카드 등록 완료'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)