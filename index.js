const shuffle_btn = document.getElementById("shuffle_btn");
const point_obj = document.getElementById("point");
const number_obj = document.getElementById("number");
const n_value_obj = document.getElementById("n_value");
const hint_1 = document.getElementById("hint_1");
const hint_2 = document.getElementById("hint_2");
const hint_3 = document.getElementById("hint_3");
const hint_4 = document.getElementById("hint_4");
const hint_5 = document.getElementById("hint_5");

const screen_hright = screen.height;
const height = (screen_hright - 300) / 5
path = "./Image/"; //画像パス
answer_list = create_answer_list() //正解
answer = 0; 
shuffle_num = 0;
flag = false; //不正解フラグ
open_num = 0; //めくったカードの枚数
answers_num = 0;
n = 2; //n進法
object_list = [];
hint_input()

function hint_input(){
    hint_1.innerHTML = n ** 4;
    hint_2.innerHTML = n ** 3;
    hint_3.innerHTML = n ** 2;
    hint_4.innerHTML = n ** 1;
    hint_5.innerHTML = n ** 0;
}

for(var i = 1; i <= 5; i++) {
    list = []
    for(var j = 1; j <= 5; j++) {
        column = document.getElementById("img_" + String(i) + "_" + String(j));
        column.src = path + "tramp.jpg";
        column.style.height = height + "px";

        column.addEventListener("click", function(){
            id = (this.id).split("_");
            
            row = parseInt(id[1]) - 1;
            collum = parseInt(id[2]) - 1;

            console.log(row, collum);

            value = answer_list[row][collum];

            console.log(value);

            if(value == "enemy"){
                flag = true;
            }else{
                open_num ++;

                console.log("OPEN_NUM : " + open_num)

                this.src = path + value + ".jpg";

                if(open_num == answers_num){
                    flag = true;
                    answer += 1;

                    point_obj.innerHTML = answer + "/" + shuffle_num + "(" + Math.round(((answer / shuffle_num) * 100)) + "%)"
                }
            }

            if(flag){
                object_list.forEach((list, row) =>{
                    Object.keys(list).forEach((key, column) =>{
                        img = list[key];
                        img.src = path + answer_list[row][column] + ".jpg";
                    });
                });
            }
        });


        list[i + "_" + j] = column;
    }
    
    
    object_list.push(list);
}

n_value_obj.addEventListener("change", function(){
    answer = 0; 
    shuffle_num = 0;
    flag = false; 
    open_num = 0; 
    answers_num = 0;

    n = n_value_obj.value;
    hint_input();

    shaffle();
});

shuffle_btn.addEventListener("click", function(){
    shaffle();
});


function create_answer_list(){
    list = new Array().fill("enemy");

    for(var i = 0; i < 5; i++){
        list[i] = new Array(5).fill("enemy");
    }

    return list;
}

function shaffle(){
    answer_list = create_answer_list();

    shuffle_num += 1;
    open_num = 0;
    answers_num = 0;
    flag = false;

    object_list.forEach((list, row) =>{
        Object.keys(list).forEach((key, column) =>{
            img = list[key];
            img.src = path + "tramp.jpg";
        });
    });

    number = Math.ceil(Math.random() * (n ** 4));

    number_obj.innerHTML = String(number) + "(" + n + ")";

    n_procedural = (number.toString(n)).split("");   

    console.log(n_procedural);

    if(n_procedural.length < 5){
        for(i = n_procedural.length; i < 5; i++){
            n_procedural.unshift("0");
        }
    }

    n_procedural.forEach((value, key) => {
        for(var i = 0; i < parseInt(value); i++){
            sekine_img = String(Math.floor(Math.random() * 11) + 1);
            answer_list[i][key] = sekine_img;
            answers_num ++;
        }
    });

    point_obj.innerHTML = answer + "/" + shuffle_num + "(" + Math.round(((answer / shuffle_num) * 100)) + "%)"
    console.log(answer_list);
    console.log("ANSWER : " + answers_num);
}
