import { Home } from "./Home.js";

import { Api } from "../Api.js";
import { StudentBook } from "./studentbook.js";


class AddBook {
    constructor(student, book) {
        this.main = document.querySelector("main");
        this.student = student;
        this.windMess = "";
        this.book = book;
        this.vecterr = [0, 0, 0];
        this.aside = document.querySelector("aside");
        this.container = document.querySelector("#container");
        this.showb = document.querySelector("#showbooks");
        if (typeof this.book == "string") {
            this.id = 0;
            this.title = "";
            this.author = "";
            this.genre = "";
            this.year = 0;
        } else {
            console.log("e obiect");
            this.id = this.book.id;
            this.title = this.book.title;
            this.author = this.book.author;
            this.genre = this.book.genre;
            this.year = this.book.year;
        }
        this.student_id = student.id;

        this.initForm();
        this.etitle = document.querySelector("#title");
        this.eauth = document.querySelector("#auth");
        this.egen = document.querySelector("#gen");
        this.eyear = document.querySelector("#year");

        this.api = new Api();
        this.titlu = "";
        this.main.addEventListener("click", this.addClick);
    }


    initForm = () => {
        let oldC = this.container.innerHTML;
        
        //let shb = document.querySelector("#showbooks");
        // shb.style.pointerEvents = "none";
        this.container.innerHTML = ``;
        this.container.innerHTML = `
        <div id="showstud">
            <p>Student: ${this.student.name}</p>
        </div>
        
        <form action="" id="frmnewbook">
            <h1>New Book</h1>
            <div id="err"></div>
            <div class="divnewb">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" value="${this.title}">
    
            </div>
            <div class="divnewb">
                <label for="auth">Author</label>
                <input type="text" name="auth" id="auth" value="${this.author}">

            </div>
            <div class="divnewb">
                <label for="gen">Genre</label>
                <input type="text" name="gen" id="gen" value="${this.genre}">

            </div>

            <div class="divnewb">
                <label for="year">Year</label>
                <input type="text" name="year" id="year" value="${this.year}">

            </div>
            <div id="idbook" hidden>${this.id}</div>
            <button class="buton unu" id="btn_nb_submit">Add Book</button>
            <button class="buton doi" id="btn_nb_cancel">Cancel</button>
        </form>        
        
        
         `;

    }


    addBook = async () => {
        let title = this.etitle.value;
        let author = this.eauth.value;
        let genre = this.egen.value;
        let year = this.eyear.value;
        
        try {
            let response=await this.api.addBook(this.student.id, { title, author, genre, year });
            return response;
        
        } catch (e) {
            throw new Error(e);
        }
        
    }

    updBook = async () => {
        try {
            
            let title = this.etitle.value;
            let author = this.eauth.value;
            let genre= this.egen.value;
            let year = this.eyear.value;
            
            let response = await this.api.updateBook(this.student.id, this.book.id, {title,author,genre,year});
            return response;
        } catch (e) {
            throw new Error(e);
        }        
    }

    checkError = () => {
        let swer = 0;
        if (document.querySelector("#title").value.length == 0) {
            swer = 1;
            this.vecterr[0] = 1;
        }

        if (document.querySelector("#auth").value.length == 0) {
            swer = 1;
            this.vecterr[1] = 1;
        }

        if (document.querySelector("#year").value < 1500 || document.querySelector("#year").value > 2022) {
            swer = 1;
            this.vecterr[2] = 1;
        }
        if (swer > 0) {
            return 1;
        } else {
            return swer;
        }
    }
    
    addOOps = () => {
        let mess = document.createElement("div");
        mess.id = "divmessage";
        this.container.appendChild(mess);
        
        mess.innerHTML += `
            <h5>
                OOPs!!!
            </h5>
        `;

    }

    addMessage = (message) => {
        let mss = document.querySelector("#divmessage");
        mss.innerHTML += `
            <p>${message}</p>
        `;
    }
    
    refreshStudent = async () => {
        try {
            let respo = await this.api.getStudentBooks(this.student.email);
            return respo;
        } catch (e) {
            throw new Error(e);
        }
    }

    addClick = async (e) => {

        let clk = e.target;
        e.preventDefault();
        if (clk.className == "buton unu") {
                
           
            console.log(this.checkError());
            if (this.checkError()==0) {
                if (this.book == "") {
                    
                   let response= await this.addBook();
                   let resps= await this.refreshStudent();
                    this.student = resps;
                    let stbb = new StudentBook(this.student);

                } else {
                    try {
                      let response2=await this.updBook();
                        return response2;
                    } catch (e) {
                        alert("eroareeeeeee");
                    }
                    try {
                        let response3 = await this.refreshStudent();
                        this.student = response3;
                        let stb = new StudentBook(this.student);

                        return response3;
                    } catch (e) {
                        
                    }
                    
                    
                }
                
            } else {
                this.addOOps();
                setTimeout(()=>{
                this.windMess = document.querySelector("#divmessage");
                if (this.vecterr[0] > 0) {
                    this.windMess.innerHTML += `
                        <p>You can't add with empty title!!</p>
                    `;
                }


                if (this.vecterr[1] > 0) {
                    this.windMess.innerHTML += `
                        <p>You can't add with empty author</p>
                    `;
                }

                if (this.vecterr[2] > 0) {
                    this.windMess.innerHTML += `
                        <p>Year between 1500 and 2022</p>
                    `;
                }




                },300);
                setTimeout(() => {
                    this.windMess.style.opacity = 0;
                    
                }, 1000);

                setTimeout(() => {
                    this.container.removeChild(this.windMess);
                   
                }, 3300);

            }
            
        
        }
          
        if (clk.className == "buton doi") { 
            let stb = new StudentBook(this.student);
        }
    }

}
export { AddBook };