import { Api } from "../api.js";
import { Home } from "./Home.js";

class StudentBook{
    constructor(student) {
        this.student = student;
        this.aside = document.querySelector("aside");
        this.main = document.querySelector("main");
        this.bookList = [];
        this.api = new Api();
        this.main.addEventListener("click",this.mainClk)
    }

    init = async () => {
        this.bookList = await this.api.getStudentBooks(this.student);

    }

    createMenu = () => {
        this.aside.innerHTML = `
            <button class="bbtn home">Home</button>
            <button class="bbtn show">Show My Books</button>
            <button class="bbtn add">Add New Book</button>
            <button class="bbtn delete">Delete One Book</button>

        `;
        
    }

    mainClk = (e) => {
        let elm = e.target;

        if (elm.className == "bbtn home") {
            e.preventDefault();
            let hm = new Home();
        }
        

    }
}

export { StudentBook};