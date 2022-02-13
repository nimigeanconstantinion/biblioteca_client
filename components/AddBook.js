import { Home } from "./Home.js";

import { Api } from "../Api.js";


class AddBook {
    constructor(student, book) {
        this.main = document.querySelector("main");
        this.student = student;
        this.book = book;
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
        let title = this.title.value;
        let author = this.auth.value;
        let genre = this.genre.value;
        let year = this.year.value;
        
        try {
            let response = await this.api.addBook(this.student.id, { title, author, genre, year });
            return response;
        } catch (e) {
            throw new Error(e);
        }
        
    }

    updBook = async () => {
        
    }

    checkError = () => {
        let diver = document.querySelector("#err");
        diver.innerHTML = ``;
        let swer = 0;
        if (this.title.value.length == 0) {
            //    // alert("in fara titlu");
            swer = 1;
            if (diver.innerHTML.length == 0) {
                this.addOOps();
            }
            diver.innerHTML += `
                    <p id="ertit">Title is Required</p>
                `;
        }

        if (this.auth.value.length == 0) {
            swer = 1;

            if (diver.innerHTML.length == 0) {
                this.addOOps();
            }
            diver.innerHTML += `
                <p id="eraut">Author is Required</p>
     
                `;
            
        
        }

        if (this.year.value < 1500 || this.year.value > 2022) {
            swer = 1;
            if (diver.innerHTML.length == 0) {
                this.addOOps();
            }
            diver.innerHTML += `
                <p id="eraut">Year error</p>
                `;
            
        }
        return swer;
    }

    addOOps = () => {
        let diver = document.querySelector("#err");
        let diverMessage = diver.innerHTML;
        diver.innerHTML += `
            <h5>
                OOPs!!!
            </h5>
        `;

    }
    
    addClick = (e) => {

        e.preventDefault();
        let clk = e.target;
        
        if (clk.className == "buton unu") {
                
            if (this.checkError() == 0) {
                let response = this.addBook();
                alert(response);
                
            } else {
                

            }
            
        
        }
    }
}
export { AddBook };