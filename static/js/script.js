$(document).ready(function () {
    listing();
});

function listing() {
    fetch('/members').then((res) => res.json()) .then((data) => {
        let rows = data['result']
        $('.team-member').empty()
        rows.forEach((a)=>{
            let name = a['name']
            let position = a['position']
            let mbti = a['mbti']
            let hobby = a['hobby']
            let img = a['img']

            let temp_html = `<div class="member-list" >
                                <div class="member-img"><img src="${img}" /></div>                
                                <div class="member-info">
                                    <h5 class="mem-name">${name}</h5>
                                    <p class="mem-posi">포지션 : ${position}</p>
                                    <p class="mem-mbti">MBTI : ${mbti}</p>
                                    <p class="mem-hobby">취미 : ${hobby}</p>

                                    <button class="more-btn" onclick="open_popup()">More</button>
                                </div>
                            </div>`
                            
            $('.team-member').append(temp_html);

            const boxs = document.querySelectorAll(".member-list");
            boxs.forEach((el, index) => {
                el.onclick = () => {
                    
                $('#popup').show();
                console.log(index);
                let rowData = rows[index]
                console.log(rowData)
                
                $('.member-contents').empty();
                    let name = rowData['name']
                    let position = rowData['position']
                    let mbti = rowData['mbti']
                    let hobby = rowData['hobby']
                    let email = rowData['email']
                    let git = rowData['git']
                    let blog = rowData['blog']
                    let img = rowData['img']
        
                    let temp_html2 = `<div class="pop-img">
                                        <img src="${img}" alt="멤버 이미지" />
                                    </div>
                                    <div class="pop-info">
                                        <h5 class="mem-name">${name} </h5>
                                        <p class="mem-posi">포지션 : ${position}</p>
                                        <p class="mem-mbti">MBTI : ${mbti}</p>
                                        <p class="mem-hobby">취미 : ${hobby}</p>
        
                                        <p class="mem-mail">이메일 : ${email}</p>
                                        <p class="mem-git"><a href="https://github.com/${git}"> Git ID : ${git}</a></p>
                                        <p class="mem-blog"><a href="${blog}" > Blog : ${blog}</a></p>
                                    </div>  `
                    $('.member-contents').append(temp_html2);
                }
            });
            
        })            
    });
}

function save_member() {
    let name = $('#name').val();
    let position = $('#position').val();
    let mbti = $('#mbti').val();
    let hobby = $('#hobby').val();
    let email = $('#email').val();
    let git = $('#git').val();
    let blog = $('#blog').val();
    let img = $('#member-img').val();

    let formData = new FormData();
    formData.append('name_give',name)
    formData.append('position_give',position)
    formData.append('mbti_give',mbti)
    formData.append('hobby_give',hobby)
    formData.append('email_give',email)
    formData.append('git_give',git)
    formData.append('blog_give',blog)
    formData.append('img_give',img)

    fetch("/members", { method: "POST", body: formData }).then(res => res.json()).then(data => {
        console.log(data)
        alert(data['msg']);
        window.location.reload()
    })
}

function open_popup() {
    $('#popup').show();
}
function close_popup() {
    $('#popup').hide();
}

function open_box() {
    $('#input-wrap').slideDown();
    $('.writing-btn').css({'opacity':'0'});
}
function close_box() {
    $('#input-wrap').slideUp();
    $('.writing-btn').css({'opacity':'1'});
}