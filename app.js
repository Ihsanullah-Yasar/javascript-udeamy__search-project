// Dom controller

class Dom{
    constructor(){
        this.navbar=document.querySelector('.navbar');
        console.log('Dom constructor called');
    }
    

 
}



// setEventLestener();

// App Controller

class AppController{
    constructor(){
        this.myDom=new Dom();
        this.mynav=this.myDom.navbar;
        this.mythis=this;
        // console.log('app controller constructor called');
    }
    showNav(){
        var elem=document.querySelectorAll('li.showHide');
        for(var i=0;i<elem.length;i++){
            elem[i].style.display='inline-block';
        }
        document.querySelector('.navbar').style.height='300px';
        document.querySelector('.nav-btn').style.display='none';
        document.querySelector('.close-btn').style.display='block';
     }
      closeNav(){
        var elem=document.querySelectorAll('li.showHide');
        for(var i=0;i<elem.length;i++){
            elem[i].style.display='none';
        }
        document.querySelector('.navbar').style.height='60px';
    
        document.querySelector('.nav-btn').style.display='block';
        document.querySelector('.close-btn').style.display='none';
     }
    // all events are setupped in this function
    setEventLestener(){
        // mythis variable is declared to access insert course method from deep scope
        var mythis=this;
          console.log('set event lestener function called');
        document.querySelector('.nav-btn').addEventListener('click' , this.showNav);
        document.querySelector('.close-btn').addEventListener('click' , this.closeNav);
        window.addEventListener('resize', ()=> {
            if(window.innerWidth > 768){
                var elem=document.querySelectorAll('li.showHide');
                for(var i=0;i<elem.length;i++){
                    elem[i].style.display='block';
                }
                document.querySelector('.navbar').style.height='150px';
                document.querySelector('.nav-btn').style.display='none';
                document.querySelector('.close-btn').style.display='none';
                
            }else{
                document.querySelector('.navbar').style.height='60px';
                var elem=document.querySelectorAll('li.showHide');
                for(var i=0;i<elem.length;i++){
                    elem[i].style.display='none';
                }
                document.querySelector('.nav-btn').style.display='block';
            }
        });
        // event for search input when someone press enter key
        document.addEventListener('keypress', function(event){
            
            if(event.keyCode ===13 || event.which ===13){
                // console.log("enter pressed");
                let searchInput=document.querySelector('#searchInp');
                let searchPattern=new RegExp(searchInput.value,'i','g');
    
                // const courseObj=new courses();
                const courseArray=courses.createCourses();
                let searchResult=new Array();
                

                for(let i=0;i<courseArray.length;i++){
                    if(searchPattern.test(courseArray[i].title) || searchPattern.test(courseArray[i].description)){
                        searchResult.push(courseArray[i]);
                    }
                }
                //we should empty the Search Result block(division) if not it will be doplicated
                document.querySelector('.searchResult').innerHTML='';
                //check if a search result exist or not
                if(searchResult.length==0){
                    // we should empty the course list container
                    let courseElements=document.querySelector('.col2');
                    courseElements.innerHTML='';
                    courseElements.insertAdjacentHTML("beforeend",'<h1 class="notMatched">Course Not found</h1>');
                    document.querySelector('.searchResult').insertAdjacentHTML("beforeend",`<h1 class="title">0 , Result for "${searchInput.value}"</h1>
                    `);
                    document.querySelector('.search-result').innerHTML=' ';
                    
                }else{
                    document.querySelector('.searchResult').insertAdjacentHTML("beforeend",`<h1 class="title">${searchResult.length} , Result for "${searchInput.value}"</h1>
                    <p class="course-info bold">Explore <span class="purple big">${searchInput.value}</span> cousrses</p>
                    <p class="suggest bold">student also learn , <span class="purple">Data science, Machine Learning , Flask , Web Scraping , programming fundamental, Data analysis</span></p>`);
                    // upadate search result text
                    document.querySelector('.search-result').innerHTML=`${searchResult.length}, Search Result`;
                    // show result on page
                    mythis.insertcourses(searchResult);
                    // let obj=new AppController();
                    // obj.insertcourses(searchResult);
            }
                
                
            }
        });
        document.querySelector('.sort-opt').addEventListener('change',()=>{

            let sortOption=document.querySelector('.sort-opt').value;
            console.log(this.ManuplatedArray)
            this.sortCourses(this.ManuplatedArray,sortOption);

            // if(sortOption=='relavant'){
            //     console.log('we sshould search on most relavant')
            // }else if(sortOption=='viewed'){
            //     console.log('we should search most vied')
            // }else if(sortOption=='rated'){
            //     console.log('we should search Highest rated')
            // }else if(sortOption=='newest'){
            //     console.log('we should search newest');
            // }// no need for else statement
        });
        // filters event
        document.querySelector('.rated').addEventListener('change',()=>{
            this.filterCourses(this.ManuplatedArray,document.querySelector('.rated').value,'rated');
            
        });
        document.querySelector('.language').addEventListener('change',()=>{
            this.filterCourses(this.ManuplatedArray,document.querySelector('.language').value,'language');
        });
        document.querySelector('.videoDuration').addEventListener('change',()=>{
            this.filterCourses(this.ManuplatedArray,parseFloat(document.querySelector('.videoDuration').value),'Duration');
        });
        document.querySelector('.topic').addEventListener('change',()=>{
            this.filterCourses(this.ManuplatedArray,document.querySelector('.topic').value,'topic');
            
        });
        
        
         
        
    
    
    }
    insertcourses(array){ 
    // check array if there is some courses or not
    if(array.length==0){
            let courseElements=document.querySelector('.col2');
            courseElements.innerHTML='';
            courseElements.insertAdjacentHTML("beforeend",'<h1 class="notMatched">Course Not found</h1>');
            document.querySelector('.search-result').innerHTML=' ';
    }
    // we should empty the course list container
    let courseElements=document.querySelector('.col2');
    courseElements.innerHTML='';
    // Store current manupated array 
    this.ManuplatedArray=array;
    //for loop to iterate through array and set element content
    let stars;
    for(let i=0;i<array.length;i++){
        // insert exact course rated star
        if(array[i].ratedStar==1){
            stars=`<span class="stars">&starf;</span>`;
        }else if(array[i].ratedStar==2){
            stars=`<span class="stars">&starf;&starf;</span>`;
        }else if(array[i].ratedStar==3){
            stars=`<span class="stars">&starf;&starf;&starf;</span>`;
        }else if(array[i].ratedStar==4){
            stars=`<span class="stars">&starf;&starf;&starf;&starf;</span>`;
        }else if(array[i].ratedStar>4){
            stars=`<span class="stars">&starf;&starf;&starf;&starf;&star;</span>`;
        }
        //insert course on page
        document.querySelector('.col2').insertAdjacentHTML('beforeend',`<div class="courses">
            <div class="cover-image">
                <img src="${array[i].Img}" alt="course cover image">
            </div>
            <div class="course-details">
                <div class="related-details">
                    <h5 class="title">${array[i].title}</5>
                    <p class="para">${array[i].description}</p>
                    <h6 class="course-instructor">${array[i].instructor}</h6>
                    <h6 class="rated">${array[i].ratedStar} ${stars} (${array[i].viewed})</h6>
                    <h6 class="content-info">${array[i].Duration} total hours - ${array[i].lectures} lectures : ${array[i].level}</h6>
                </div>
                <div class="course-price">
                    <h3 class="price">${array[i].price}&dollar;</h3>
                    <h3 class="price">${array[i].date}</h3>
                </div>
            </div>
        </div>`);
        // document.querySelector()
    // console.log(courseDiv);
    }
        

    }

    sortCourses(array,sortType){
        // console.log(`sort function called with ${array} and  ${sortType}`);
        // we will sort with bubble sort algorithm
        let temp;// for swapping 
        switch(sortType){
            case 'relavant' :
                this.insertcourses(array);
                break;
            case 'viewed' :
                for(let i=0;i<array.length;i++)
                    for(let j=0;j<array.length-i-1;j++){
                        if(array[j+1].viewed>array[j].viewed){
                            [array[j+1],array[j]]=[array[j],array[j+1]];
                        }
                    }
                    this.insertcourses(array);

                break;
            case 'rated' : 
            for(let i=0;i<array.length;i++)
                    for(let j=0;j<array.length-i-1;j++){
                        if(array[j+1].ratedStar>array[j].ratedStar){
                            [array[j+1],array[j]]=[array[j],array[j+1]];
                        }
                    }
                    this.insertcourses(array);
            break;
            case 'newest' :
                // let currentDate=new Date();
                
                // console.log(currentDate.setDate(currentDate.getMonth()-11));
                for(let i=0;i<array.length;i++)
                    for(let j=0;j<array.length-i-1;j++){
                        // let checkDate=new Date(array[j].date);
                        console.log(new Date(array[j+1].date).valueOf() > new Date(array[j].date).valueOf() );
                        if(new Date(array[j+1].date).getMonth() > new Date(array[j].date).getMonth() && new Date(array[j+1].date).getFullYear() >= new Date(array[j].date).getFullYear()){
                            [array[j+1],array[j]]=[array[j],array[j+1]];
                            console.log('swapped occur');
                        }
                    }
                    this.insertcourses(array);


            console.log('newest sorting is done');
            break;   
        }


    }
    filterCourses(array,filterValue,option){
        let filteredArray=new Array();
        switch(option){
            case 'rated':
            // filter courses by selected number of rated star
            for(let i=0;i<array.length;i++){
                if(array[i].ratedStar>=filterValue){
                    filteredArray.push(array[i]);
                }
            }
            break;
            case 'language':    
            for(let i=0;i<array.length;i++){
                // console.log(array[i]);
                if(array[i].language==filterValue){
                    filteredArray.push(array[i]);
                }
            }
            break;
            case 'Duration':
                
                for(let i=0;i<array.length;i++){
                    // console.log(array[i]);
                    // console.log("backend "+typeof array[i].Duration);
                    if(array[i].Duration<=filterValue){
                        filteredArray.push(array[i]);
                    }
                }
            break;
            case 'topic':
                for(let i=0;i<array.length;i++){
                    // console.log(array[i]);
                    // console.log("backend "+typeof array[i].Duration);
                    if(array[i].topic==filterValue){
                        filteredArray.push(array[i]);
                    }
                } 
            break;
            
        }
        document.querySelector('.NumOfFilter').textContent=parseInt(document.querySelector('.NumOfFilter').textContent.valueOf())+1;
        if(filteredArray.length==0){
            filteredArray=courses.createCourses();
            
        }   
        this.insertcourses(filteredArray)
    }
    
    
}

class courses{
    constructor(Img,title,description,instructor,ratedStar,Duration,level,language,feature,date,topic,price,lectures,viewed){
        this.Img=Img;
        this.title=title;
        this.description=description;
        this.instructor=instructor;
        this.ratedStar=ratedStar;
        this.Duration=Duration;
        this.level=level;
        this.language=language;
        this.feature=feature;
        this.date=date;
        this.topic=topic;
        this.price=price;
        this.lectures=lectures;
        this.viewed=viewed;
    }
    static createCourses(){
        // Creating courses with fake contents
        let course1=new courses('courseCoverImg/image1.PNG','100 Days of Code: The Complete phyton pro bootcamp for 2023','Master <span class="important">Phyton</span> by building 100 projects in 100 days. learn data science , automation, build websites, games and apps.','Dr. Angela YU',4.3,64,'All level','English','notknown','4,12,2022','programming','30',44,66489);
        let course2=new courses('courseCoverImg/image2.PNG','2022 complete phyton Bootcamp from zero to hero','learn phyton like professional, start from basic and go all the way to create your own application and games.','Jose portila',4.7,34,'All level','English','notknown','5,12,2021','programming','12',22,129988);
        let course3=new courses('courseCoverImg/cssFoundationFramwork.PNG','Css foundation framwork 2022','learn the cool framwork ande enjoy easy design.','Dr. Amit mehra',4.1,3,'intermediate','Urdu','notknown','6,12,2021','programming','6',13,917219);
        let course4=new courses('courseCoverImg/exprssJsAndNodeJs.PNG','Node.js and express.js complete course','learn node and express with one project on each and make your own application with fun.','mike willis',3,17,'basic','Arabic','notknown','2,1,2020','programming','15',24,32200);
        let course5=new courses('courseCoverImg/meterializeCss.PNG','Css meterialize framwork complete','spare your time with meterialize framwork and make responsive design pretty easy.','Rahmat Dansih',2,1,'All level','Persion','notknown','3,7,2022','programming','8',8,1500);
        let course6=new courses('courseCoverImg/oraclePashto.PNG','Oracle complete pashto course','learn oracle in pashto and make great databases and learn useful query with bank MS project.','Abdullah sorush',1,32,'basic','Pashtoo','notknown','4,12,2022','database','13',75,689762);
        
        let course7=new courses('courseCoverImg/laravelFromScratch.PNG','Laravel complete freeCodeCamp course form scratch','learn laravel and build great and secure website , include two project','james gasoline',3,44,'Expert','English','notknown','1,24,2022','programming','36',72,23119);
        let course8=new courses('courseCoverImg/oraclePashto.PNG','networking complete course form zero to hero','learn networking including CCNA, CCNP, CCNE. ','Abdullah sorush',2,16,'expert','Pashtoo','notknown','9,12,2022','network','18',39,1125);
        let course9=new courses('courseCoverImg/image2.PNG','data science with phyton complete from scratch','learn phyton like professional, work with data science .','william\'s george',4.4,7,'expert','English','notknown','12,3,2022','data science','115',35,1123255);
        let course10=new courses('courseCoverImg/javascript.PNG','Modern javascript from the begining','learn javascript, make interactive and dynamic webiste.','Abbacki',4.5,17,'All level','English','notknown','10,6,2022','programming','90',136,6097);
        let course11=new courses('courseCoverImg/javascript1.PNG','The complete javascript course','learn javascript form intial state to master level.','Jonas schemedtmann',4.6,26,'All level','Persion','notknown','15,9,2022','programming','70',87,753297);
        let course12=new courses('courseCoverImg/javascriptPersion.PNG','The complete javascript Pashtoo course','learn javascript with ease and enjoy making application and websites.','ahmad wiyar',4.2,44,'All level','Pashtoo','notknown','10,11,2022','programming','10',49,335512);
        let course13=new courses('courseCoverImg/typescript.PNG','The complete typescript diamond course','learn typescript(javascript) language and enjoy the cool feature of javascript.','mikewell schorlet',4.2,23,'expert','English','notknown','21,6,2022','programming','15',30,335512);
        let course14=new courses('courseCoverImg/LMSproject.PNG','Libray management system in java','build a library management system with full features.','mikewell schorlet',4.2,30,'expert','English','notknown','21,12,2022','programming','29',70,335512);
        let course15=new courses('courseCoverImg/ReactJS.PNG','React (javascript) full course','learn react framework and build beautiful app and websites.','jose waker',4.4,73,'expert','English','notknown','6,12,2022','programming','29',120,1112355);

        //place courses in array
        let arr=[course1,course2,course3,course4,course5,course6,course7,course8,course9,course10,course11,course12,course13,course14,course15];
        return arr;

    }
    getCourses(){
        console.log('you will get the courses');
        
    }
}


function main(){
    console.log('main function loaded');
    // create objects
    const myDom=new Dom();
    const AppCtrl=new AppController();
    // const AppCtrl=Object.create(AppController);
    AppCtrl.setEventLestener();
    //create courses
    
    const arr=courses.createCourses();

    
    // insert courses on page
    AppCtrl.insertcourses(arr);
    function getCourses(){
        return arr;
    }


}


window.addEventListener('load',()=>{main();});