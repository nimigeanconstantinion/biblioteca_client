class Api{
    api = (path,method="GET",body=null) => {
        let url = path;
        const options = {
            method,
            headers:{
                'Content-Type': 'application/json;charset=utf-8'
            }
        };
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        return fetch(url, options);
}

    getallStudents =async () => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/stud", "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    
    }
    getAllBiblio = async () => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/biblio", "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    

    }
    getStudentBooks = async (email) => {
        try {
            
            let response = await this.api("http://localhost:8080/api/v1/students/email/"+email, "GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
    }
    
    addBook = async (id,book)=>{
        try {
            let response = await this.api("http://localhost:8080/api/v1/students/books/add/"+id, "POST",book);
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    }


    chkPass = async (email,pass)=>{
        try {
            let response = await this.api("http://localhost:8080/api/v1/students/pass/"+email+"/"+pass,"GET");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
    }

    delBookStud = async (student, book) => {
        try {
            let response = await this.api("http://localhost:8080/api/v1/biblio/"+student.id+"/"+book.id, "DELETE");
            return response.json();
        } catch (e) {
            throw new Error(e);
        }
        
        
        

    }
}

export { Api};