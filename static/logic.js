function firstPage()
{
  document.getElementsByClassName("newsDiv")[0].style.removeProperty("display");
  document.getElementById("searchb").setAttribute("class","btn btnNotHome bbelow");
  document.getElementById("googleb").setAttribute("class","btn btnHome babove");
  if(document.getElementById("newsDivOfSecondPage"))
  {
    document.getElementById("newsDivOfSecondPage").style.display="none";
  }
}

function getInitialSources()
{
  //SETTING SOURCE options START
  var categoryValue = "all";
  //console.log(document.getElementById("category").options[document.getElementById("category").selectedIndex].value);
  var selectSourceBox= document.getElementById("sources");
  
  var sourceFirstChild=selectSourceBox.firstChild;
  selectSourceBox.innerHTML="";
  selectSourceBox.appendChild(sourceFirstChild);
  // if(categoryValue!="All")
  // {
    var xmlhttpInitialSource=new XMLHttpRequest();
    xmlhttpInitialSource.open("GET","/getsources?Category="+categoryValue,true);
    xmlhttpInitialSource.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttpInitialSource.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        var jobj=JSON.parse(xmlhttpInitialSource.responseText);
        sourceArray=jobj.newsSources.sources;

        var selectSourceBox= document.getElementById("sources");
        var limitTen;
        if(sourceArray.length<10)
        {
          limitTen=sourceArray.length;
        }
        else
        {
          limitTen=10;
        }
        for(var i=0;i<limitTen;i++)
        {
          var optionName=sourceArray[i].name;
          var optionID=sourceArray[i].id;
          var sourceOption=document.createElement("option");
          sourceOption.value=optionName;
          sourceOption.id=optionID;
          sourceOption.appendChild(document.createTextNode(optionName));
          selectSourceBox.appendChild(sourceOption);
        }
    }
  }
  xmlhttpInitialSource.send();

  //SETTING SOURCE options END
}

function secondPage()
{
  document.getElementsByClassName("newsDiv")[0].style.display="none";
  document.getElementById("googleb").setAttribute("class","btn btnNotHome babove");
  document.getElementById("searchb").setAttribute("class" ,"btn btnHome bbelow");

  if(document.getElementById("newsDivOfSecondPage"))
  {
    if(document.getElementById("newsDivOfSecondPage").style.display="none")
    {
      document.getElementById("newsDivOfSecondPage").style.removeProperty("display");
    }
    return;
  }

  var newsDivOfSecondPage=document.createElement("Div");
  newsDivOfSecondPage.id="newsDivOfSecondPage";
  newsDivOfSecondPage.style.height="1000px";
  newsDivOfSecondPage.style.width="550px";
  newsDivOfSecondPage.style.marginLeft="130px";

  var searchDiv=document.createElement("Div");
  searchDiv.id="searchDiv";
  searchDiv.style.margin="auto";
  searchDiv.style.marginBottom="20px";
  searchDiv.style.width="435px";
  searchDiv.style.height="100px";
  searchDiv.style.backgroundColor="rgb(243, 244, 244)";
  searchDiv.style.padding="10px";
  searchDiv.style.paddingBottom="0px"
  searchDiv.style.fontSize="12px";
  searchDiv.style.fontStyle="Georgia, 'Times New Roman', Times, serif";

  var searchForm=document.getElementById("searchForm");
  
  var keywordLabel=document.createElement("label");
  var keywordInputTextbox=document.getElementById("keyword");
  keywordInputTextbox.style.fontSize="10px";
  keywordInputTextbox.style.borderColor="rgb(243, 151, 151)";
  keywordInputTextbox.style.borderWidth="1px";
  keywordInputTextbox.style.borderStyle="solid";
  keywordInputTextbox.oninput=function(){this.style.borderWidth="0px"};
  keywordInputTextbox.style.marginRight="10px";
  keywordInputTextbox.style.width="60px";
  keywordInputTextbox.style.height="12px";
  keywordLabel.for="keyword";
  
  var keywordLabelText=document.createTextNode("Keyword");
  
  var keywordLabelTextSpan=document.createElement("span");
  keywordLabelTextSpan.style.color="red";
  keywordLabelTextSpan.style.whiteSpace="pre";
  keywordLabelTextSpan.appendChild(document.createTextNode("*   "));
  
  keywordLabel.appendChild(keywordLabelText);
  keywordLabel.appendChild(keywordLabelTextSpan);

  searchForm.appendChild(keywordLabel);
  searchForm.appendChild(keywordInputTextbox);

  var currentDate=new Date();
  var milliseconds=currentDate.getTime();
  milliseconds=milliseconds-604800000;
  var oneWeekBackDate= new Date();
  oneWeekBackDate.setTime(milliseconds);
  //console.log(currentDate.toISOString());

  var fromDateBox=document.getElementById("fromDate");
  fromDateBox.style.marginRight="10px";
  fromDateBox.style.width="92px";
  fromDateBox.style.height="12px";
  fromDateBox.style.fontSize="10px";  
  fromDateBox.value=oneWeekBackDate.getFullYear() + '-' + ('0' + (oneWeekBackDate.getMonth() + 1)).slice(-2) + '-' + ('0' + oneWeekBackDate.getDate()).slice(-2);
  var fromLabel=document.createElement("label");
  fromLabel.for="fromDate";
  var fromLabelText=document.createTextNode("Form")

  var fromLabelTextSpan=document.createElement("span");
  fromLabelTextSpan.style.color="red";
  fromLabelTextSpan.style.whiteSpace="pre";
  fromLabelTextSpan.appendChild(document.createTextNode("*   "));
  
  fromLabel.appendChild(fromLabelText);
  fromLabel.appendChild(fromLabelTextSpan);

  searchForm.appendChild(fromLabel);
  searchForm.appendChild(fromDateBox);

  var toDateBox=document.getElementById("toDate");
  toDateBox.style.width="92px";
  toDateBox.style.height="12px";
  toDateBox.style.fontSize="10px";
  toDateBox.value=currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
  var toLabel=document.createElement("label");
  toLabel.for="toDate";
  var toLabelText=document.createTextNode("To")

  var toLabelTextSpan=document.createElement("span");
  toLabelTextSpan.style.color="red";
  toLabelTextSpan.style.whiteSpace="pre";
  toLabelTextSpan.appendChild(document.createTextNode("*   "));
  
  toLabel.appendChild(toLabelText);
  toLabel.appendChild(toLabelTextSpan);

  searchForm.appendChild(toLabel);
  searchForm.appendChild(toDateBox);
  searchForm.appendChild(document.createElement("br"));
  searchForm.appendChild(document.createElement("br"));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
  var selectCategoryBox= document.getElementById("category");
  var selectCategoryLabel= document.createElement("label");
  selectCategoryBox.style.marginRight="10px";
  selectCategoryBox.style.fontSize="10px";
  selectCategoryBox.style.width="80px";
  selectCategoryBox.style.textAlign="center";
  selectCategoryLabel.for="category";
  selectCategoryLabel.style.marginRight="10px";
  var selectCategoryLabelText=document.createTextNode("Category");
  selectCategoryLabel.appendChild(selectCategoryLabelText);

  var option1=document.createElement("option");
  option1.value="all";
  option1.selected="true";
  option1.appendChild(document.createTextNode("all"));
  selectCategoryBox.appendChild(option1);

  var option2=document.createElement("option");
  option2.value="business";
  option2.appendChild(document.createTextNode("business"));
  selectCategoryBox.appendChild(option2);

  var option3=document.createElement("option");
  option3.value="entertainment";
  option3.appendChild(document.createTextNode("entertainment"));
  selectCategoryBox.appendChild(option3);

  var option4=document.createElement("option");
  option4.value="general";
  option4.appendChild(document.createTextNode("general"));
  selectCategoryBox.appendChild(option4);

  var option5=document.createElement("option");
  option5.value="health";
  option5.appendChild(document.createTextNode("health"));
  selectCategoryBox.appendChild(option5);

  var option6=document.createElement("option");
  option6.value="science";
  option6.appendChild(document.createTextNode("science"));
  selectCategoryBox.appendChild(option6);

  var option7=document.createElement("option");
  option7.value="sports";
  option7.appendChild(document.createTextNode("sports"));
  selectCategoryBox.appendChild(option7);

  var option8=document.createElement("option");
  option8.value="technology";
  option8.appendChild(document.createTextNode("technology"));
  selectCategoryBox.appendChild(option8);


  searchForm.appendChild(selectCategoryLabel);
  searchForm.appendChild(selectCategoryBox);

  var selectSourceBox= document.getElementById("sources");
  selectSourceBox.style.width="80px";
  selectSourceBox.style.fontSize="10px";
  selectSourceBox.style.textAlign="center";
  var selectSourceLabel= document.createElement("label");
  selectSourceLabel.for="sources";
  var selectSourceLabelText=document.createTextNode("Source");
  selectSourceLabel.style.marginRight="10px";
  selectSourceLabel.appendChild(selectSourceLabelText);

  var allOption=document.createElement("option");
  allOption.id="all";
  allOption.value="all";
  allOption.selected="true";
  allOption.appendChild(document.createTextNode("all"));
  selectSourceBox.appendChild(allOption);

  getInitialSources();

  searchForm.appendChild(selectSourceLabel);
  searchForm.appendChild(selectSourceBox);
  searchForm.appendChild(document.createElement("br"));
  searchForm.appendChild(document.createElement("br"));

  var submitButton=document.getElementById("submitButton");
  submitButton.style.marginRight="15px";
  searchForm.appendChild(submitButton);



  var clearButton=document.getElementById("resetButton")
  searchForm.appendChild(clearButton);
  clearButton.onclick=doClear;

  searchDiv.appendChild(searchForm);
  searchForm.style.display="";
  document.getElementsByClassName("outermostDiv")[0].appendChild(newsDivOfSecondPage);
  newsDivOfSecondPage.appendChild(searchDiv);


  selectCategoryBox.onchange=getTheSources;
}

function doClear()
{
  var secondPageNewsDiv=document.getElementById("newsDivOfSecondPage");
  if(document.getElementById("allNewsCards"))
  {
    secondPageNewsDiv.removeChild(document.getElementById("allNewsCards"));
  }

  var keyBox=document.getElementById("keyword");
  var fromDateTextbox=document.getElementById("fromDate");
  var toDateTextbox=document.getElementById("toDate");
  var categorySelector=document.getElementById("category");
  var sourceSelector=document.getElementById("sources");

  keyBox.value="";
  
  var currentDate=new Date();
  var milliseconds=currentDate.getTime();
  milliseconds=milliseconds-604800000;
  var oneWeekBackDate= new Date();
  oneWeekBackDate.setTime(milliseconds);
  //console.log(currentDate.toISOString());
  
  fromDateTextbox.value=oneWeekBackDate.getFullYear() + '-' + ('0' + (oneWeekBackDate.getMonth() + 1)).slice(-2) + '-' + ('0' + oneWeekBackDate.getDate()).slice(-2);
  toDateTextbox.value=currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);

  var categoryFirstChild=categorySelector.firstChild;
  categoryFirstChild.selected=true;

  var sourceFirstChild=sourceSelector.firstChild;
  sourceSelector.innerHTML="";
  sourceSelector.appendChild(sourceFirstChild);

  getInitialSources();
}
function getSearchedNews()
{
  
  var sourceValue = document.getElementById("sources").options[document.getElementById("sources").selectedIndex].id;
  var keywordValue= document.getElementById("keyword").value;
  var fromDateValue= document.getElementById("fromDate").value;
  var toDateValue= document.getElementById("toDate").value;


  var fromDateObject=new Date(fromDateValue);
  var toDateObject=new Date(toDateValue);

  if(fromDateObject>toDateObject)
  {
    alert("Incorrect time");
    return;
  }

  var xmlhttpNews=new XMLHttpRequest();
  xmlhttpNews.open("GET","/getSearchedNews?keyword="+keywordValue+"&fromDate="+fromDateValue+"&toDate="+toDateValue+"&source="+sourceValue,true);
  xmlhttpNews.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttpNews.onreadystatechange = function()
  { // Call a function when the state changes.
    if (this.readyState === xmlhttpNews.DONE && this.status === 200)
    {
        // Request finished. Do processing here.
        var jobj=JSON.parse(xmlhttpNews.responseText);
        var keys=Object.keys(jobj);
        if(keys[0]=="newsexception")
        {
          //console.log(jobj.newsexception);
          alert(jobj.newsexception);
          return;
        }
        searchedArray=jobj.searchedNews;

        var secondPageNewsDiv=document.getElementById("newsDivOfSecondPage");
        if(document.getElementById("allNewsCards"))
        {
          secondPageNewsDiv.removeChild(document.getElementById("allNewsCards"));  
        }
        
        var allNewsCards=document.createElement("div");
        allNewsCards.style.textAlign="center";
        allNewsCards.id="allNewsCards";
        allNewsCards.style.width="420px";
        allNewsCards.style.margin="auto";

        secondPageNewsDiv.appendChild(allNewsCards);

        var i;
        if(searchedArray.length==0)
        {
          var noResults=document.createElement("p");
          noResults.style.textAlign="center";
          noResults.style.fontStyle="Georgia, 'Times New Roman', Times, serif";
          noResults.style.fontSize="12px";
          noResults.appendChild(document.createTextNode("No Results"));
          allNewsCards.appendChild(noResults);
          return;
        }

        //console.log(searchedArray.length);
        for(i=0;i<searchedArray.length;i++)
        {

          if(i==5)
          {
            break;
          }
          var newsImage=searchedArray[i].urlToImage;
          var newsTitle=searchedArray[i].title;
          var newsDescription=searchedArray[i].description;
          var newsAuthor=searchedArray[i].author;
          var newsSource=searchedArray[i].source.name;
          
          var newsDateObject=new Date(searchedArray[i].publishedAt);
          var mons;
          var days;
          var year=newsDateObject.getFullYear();
          if(newsDateObject.getMonth()>8)
          {
            var mon=newsDateObject.getMonth()+1;
            mons=mon.toString();
          }
          else
          {
            mons='0'+(newsDateObject.getMonth()+1);
          }

          if(newsDateObject.getDate()>9)
          {
            days=newsDateObject.getDate().toString();
          }
          else
          {
            days='0'+newsDateObject.getDate();
          }
          var newsDate=mons+'/'+days+'/'+year;

          var newsLink=searchedArray[i].url;
          
          var searchedCarDiv=document.createElement("Div");
          
          allNewsCards.appendChild(searchedCarDiv);

          searchedCarDiv.setAttribute("class","secondPageNewsCard");
          searchedCarDiv.addEventListener("click",collapseOrDetails);
          searchedCarDiv.style.marginTop="4px";

          var imageSectionDiv=document.createElement("div");
          imageSectionDiv.style.width="20%";
          imageSectionDiv.style.marginLeft="10px";
          imageSectionDiv.style.marginTop="10px";
          imageSectionDiv.style.marginBottom="10px";
          imageSectionDiv.style.height="auto";
          imageSectionDiv.style.display="flex";
          var newsCardImage=document.createElement("img");
          newsCardImage.src=newsImage;
          newsCardImage.style.width="100%";
          newsCardImage.style.height="70px";
          newsCardImage.style.marginTop="0px";

          imageSectionDiv.appendChild(newsCardImage);
          searchedCarDiv.appendChild(imageSectionDiv);

          var textSectionDiv=document.createElement("div");
          textSectionDiv.style.width="70%";
          textSectionDiv.style.margin="10px";
          textSectionDiv.style.textAlign="left";
          textSectionDiv.style.fontFamily="Georgia, 'Times New Roman', Times, serif";

          var newsCardTitle= document.createElement("p");
          newsCardTitle.style.marginBottom="0px";
          newsCardTitle.style.marginTop="0px";
          newsCardTitle.style.fontSize="11px";
          newsCardTitle.style.fontWeight="bold";
          newsCardTitle.appendChild(document.createTextNode(newsTitle));
          textSectionDiv.appendChild(newsCardTitle);
          searchedCarDiv.appendChild(textSectionDiv);

          var hiddenDiv=document.createElement("div");
          hiddenDiv.style.marginTop="0px";
          hiddenDiv.style.marginBottom="0px";
          hiddenDiv.style.display="none";
          

          var newsCardAuthor=document.createElement("p");
          newsCardAuthor.style.marginBottom="0px";
          newsCardAuthor.style.marginTop="5px";
          newsCardAuthor.style.fontSize="10px";
          var authorTitle=document.createElement("span");
          authorTitle.style.whiteSpace="pre";
          authorTitle.style.fontWeight="bold";
          authorTitle.appendChild(document.createTextNode("Author: "));
          newsCardAuthor.appendChild(authorTitle);
          newsCardAuthor.appendChild(document.createTextNode(newsAuthor));

          hiddenDiv.appendChild(newsCardAuthor);

          var newsCardSource=document.createElement("p");
          newsCardSource.style.marginBottom="0px";
          newsCardSource.style.marginTop="5px";
          newsCardSource.style.fontSize="10px";
          var sourceTitle=document.createElement("span");
          sourceTitle.style.whiteSpace="pre";
          sourceTitle.style.fontWeight="bold";
          sourceTitle.appendChild(document.createTextNode("Source: "));
          newsCardSource.appendChild(sourceTitle);
          newsCardSource.appendChild(document.createTextNode(newsSource));

          hiddenDiv.appendChild(newsCardSource);

          var newsCardDate=document.createElement("p");
          newsCardDate.style.fontSize="10px";
          newsCardDate.style.marginBottom="0px";
          newsCardDate.style.marginTop="5px";
          var dateTitle=document.createElement("span");
          dateTitle.style.whiteSpace="pre";
          dateTitle.style.fontWeight="bold";
          dateTitle.appendChild(document.createTextNode("Date: "));
          newsCardDate.appendChild(dateTitle);
          newsCardDate.appendChild(document.createTextNode(newsDate));

          hiddenDiv.appendChild(newsCardDate);

          textSectionDiv.appendChild(hiddenDiv);

          var newsCardDescription= document.createElement("p");
          newsCardDescription.style.fontSize="9px";
          newsCardDescription.style.marginBottom="0px";
          newsCardDescription.style.marginTop="5px";
          var tempDescription=newsDescription;


          if(tempDescription.length>=65)
          {
            var firstPartOfDescriptionSpaceNotChecked=tempDescription.substring(0,65);
            var lastSpaceIndex=firstPartOfDescriptionSpaceNotChecked.lastIndexOf(" ");

            var firstPartOfDescription=tempDescription.substring(0,lastSpaceIndex); 
            var ellipses="...";
            var restOfDescription=tempDescription.substring(lastSpaceIndex,);

            var textBefore=document.createElement("span");
            textBefore.appendChild(document.createTextNode(firstPartOfDescription));
            var ellipseSpan=document.createElement("span");
            var textAfter=document.createElement("span");
            textAfter.style.display="none";
            textAfter.appendChild(document.createTextNode(restOfDescription));

            ellipseSpan.appendChild(document.createTextNode(ellipses));

            newsCardDescription.appendChild(textBefore);
            newsCardDescription.appendChild(ellipseSpan);
            newsCardDescription.appendChild(textAfter);
          }

          else
          {
            var theWholeText=document.createElement("span");
            theWholeText.appendChild(document.createTextNode(tempDescription));
            newsCardDescription.appendChild(theWholeText);
          }
          

          textSectionDiv.appendChild(newsCardDescription);

          var hiddenLink=document.createElement("a");
          hiddenLink.style.marginBottom="0px";
          hiddenLink.style.marginTop="5px";
          hiddenLink.href=newsLink;
          hiddenLink.style.display="none";
          hiddenLink.style.fontSize="10px";
          hiddenLink.target="_blank";
          hiddenLink.appendChild(document.createTextNode("See Original Post"));

          textSectionDiv.appendChild(hiddenLink);

          var collapseDiv= document.createElement("div");
          collapseDiv.style.height="8px";
          collapseDiv.appendChild(document.createTextNode("x"));
          collapseDiv.setAttribute("class","x");
          collapseDiv.style.display="none";
          searchedCarDiv.appendChild(collapseDiv);
          searchedCarDiv.style.cursor="pointer";
        }

        if(i==5 && searchedArray.length>=6)
        {
          var showMore=document.createElement("input");
          showMore.type="button";
          showMore.id="showMoreButton";
          showMore.value="Show More";
          showMore.onclick=showMoreFunction;
          showMore.style.marginTop="3px";
          showMore.style.marginLeft="auto";
          showMore.style.marginRight="auto";
          showMore.setAttribute("class","showMoreButton")
          allNewsCards.appendChild(showMore);

          for(;i<searchedArray.length;i++)
          {
            var newsImage=searchedArray[i].urlToImage;
            var newsTitle=searchedArray[i].title;
            var newsDescription=searchedArray[i].description;
            var newsAuthor=searchedArray[i].author;
            var newsSource=searchedArray[i].source.name;
            
            var newsDateObject=new Date(searchedArray[i].publishedAt);
            var mons;
            var days;
            var year=newsDateObject.getFullYear();
            if(newsDateObject.getMonth()>8)
            {
              var mon=newsDateObject.getMonth()+1;
              mons=mon.toString();
            }
            else
            {
              mons='0'+(newsDateObject.getMonth()+1);
            }

            if(newsDateObject.getDate()>9)
            {
              days=newsDateObject.getDate().toString();
            }
            else
            {
              days='0'+newsDateObject.getDate();
            }
            var newsDate=mons+'/'+days+'/'+year;

            var newsLink=searchedArray[i].url;
            
            var searchedCarDiv=document.createElement("Div");

            allNewsCards.appendChild(searchedCarDiv);

            searchedCarDiv.setAttribute("class","secondPageNewsCardExcess");
            searchedCarDiv.addEventListener("click",collapseOrDetails);
            searchedCarDiv.style.marginTop="4px";

            var imageSectionDiv=document.createElement("div");
            imageSectionDiv.style.width="20%";
            imageSectionDiv.style.height="auto";
            imageSectionDiv.style.display="flex";
            imageSectionDiv.style.marginLeft="10px";
            imageSectionDiv.style.marginTop="10px";
            imageSectionDiv.style.marginBottom="10px";
            var newsCardImage=document.createElement("img");
            newsCardImage.src=newsImage;
            newsCardImage.style.width="100%";
            newsCardImage.style.height="70px";
            newsCardImage.style.marginTop="0px";

            imageSectionDiv.appendChild(newsCardImage);
            searchedCarDiv.appendChild(imageSectionDiv);

            var textSectionDiv=document.createElement("div");
            textSectionDiv.style.width="70%";
            textSectionDiv.style.textAlign="left";
            textSectionDiv.style.margin="10px";
            textSectionDiv.style.fontFamily="Georgia, 'Times New Roman', Times, serif";

            var newsCardTitle= document.createElement("p");
            newsCardTitle.style.marginBottom="0px";
            newsCardTitle.style.marginTop="5px";
            newsCardTitle.style.fontSize="11px";
            newsCardTitle.style.fontWeight="bold";
            newsCardTitle.appendChild(document.createTextNode(newsTitle));
            textSectionDiv.appendChild(newsCardTitle);
            searchedCarDiv.appendChild(textSectionDiv);

            var hiddenDiv=document.createElement("div");
            hiddenDiv.style.marginTop="0px";
            hiddenDiv.style.marginBottom="0px";
            hiddenDiv.style.display="none";
            

            var newsCardAuthor=document.createElement("p");
            newsCardAuthor.style.marginBottom="0px";
            newsCardAuthor.style.marginTop="5px";
            newsCardAuthor.style.fontSize="10px";
            var authorTitle=document.createElement("span");
            authorTitle.style.whiteSpace="pre";
            authorTitle.style.fontWeight="bold";
            authorTitle.appendChild(document.createTextNode("Author: "));
            newsCardAuthor.appendChild(authorTitle);
            newsCardAuthor.appendChild(document.createTextNode(newsAuthor));

            hiddenDiv.appendChild(newsCardAuthor);

            var newsCardSource=document.createElement("p");
            newsCardSource.style.marginBottom="0px";
            newsCardSource.style.marginTop="5px";
            newsCardSource.style.fontSize="10px";
            var sourceTitle=document.createElement("span");
            sourceTitle.style.whiteSpace="pre";
            sourceTitle.style.fontWeight="bold";
            sourceTitle.appendChild(document.createTextNode("Source: "));
            newsCardSource.appendChild(sourceTitle);
            newsCardSource.appendChild(document.createTextNode(newsSource));

            hiddenDiv.appendChild(newsCardSource);

            var newsCardDate=document.createElement("p");
            newsCardDate.style.marginBottom="0px";
            newsCardDate.style.marginTop="5px";
            newsCardDate.style.fontSize="10px";
            var dateTitle=document.createElement("span");
            dateTitle.style.whiteSpace="pre";
            dateTitle.style.fontWeight="bold";
            dateTitle.appendChild(document.createTextNode("Date: "));
            newsCardDate.appendChild(dateTitle);
            newsCardDate.appendChild(document.createTextNode(newsDate));

            hiddenDiv.appendChild(newsCardDate);

            textSectionDiv.appendChild(hiddenDiv);

            var newsCardDescription= document.createElement("p");
            newsCardDescription.style.marginBottom="0px";
            newsCardDescription.style.marginTop="5px";
            newsCardDescription.style.fontSize="9px";
            var tempDescription=newsDescription;

            if(tempDescription.length>=65)
            {
              var firstPartOfDescriptionSpaceNotChecked=tempDescription.substring(0,65);
              var lastSpaceIndex=firstPartOfDescriptionSpaceNotChecked.lastIndexOf(" ");

              var firstPartOfDescription=tempDescription.substring(0,lastSpaceIndex); 
              var ellipses="...";
              var restOfDescription=tempDescription.substring(lastSpaceIndex,);

              var textBefore=document.createElement("span");
              textBefore.appendChild(document.createTextNode(firstPartOfDescription));
              var ellipseSpan=document.createElement("span");
              var textAfter=document.createElement("span");
              textAfter.style.display="none";
              textAfter.appendChild(document.createTextNode(restOfDescription));

              ellipseSpan.appendChild(document.createTextNode(ellipses));

              newsCardDescription.appendChild(textBefore);
              newsCardDescription.appendChild(ellipseSpan);
              newsCardDescription.appendChild(textAfter);
            }

            else
            {
              var theWholeText=document.createElement("span");
              theWholeText.appendChild(document.createTextNode(tempDescription));
              newsCardDescription.appendChild(theWholeText);
            }
            textSectionDiv.appendChild(newsCardDescription);

            var hiddenLink=document.createElement("a");
            hiddenLink.style.marginBottom="0px";
            hiddenLink.style.marginTop="5px";
            hiddenLink.href=newsLink;
            hiddenLink.style.display="none";
            hiddenLink.style.fontSize="10px";
            hiddenLink.target="_blank";
            hiddenLink.appendChild(document.createTextNode("See Original Post"));

            textSectionDiv.appendChild(hiddenLink);

            var collapseDiv= document.createElement("div");
            collapseDiv.style.height="8px";
            collapseDiv.appendChild(document.createTextNode("x"));
            collapseDiv.setAttribute("class","x");
            collapseDiv.style.display="none";
            searchedCarDiv.appendChild(collapseDiv);
            searchedCarDiv.style.cursor="pointer";
          }

          var showLess=document.createElement("input");
          showLess.type="button";
          showLess.id="showLessButton"
          showLess.value="Show Less";
          showLess.onclick=showLessFunction;
          showLess.style.marginTop="3px";
          showLess.style.display="none";
          showLess.setAttribute("class","showLessButton")
          allNewsCards.appendChild(showLess);
        }
    }
  }
  xmlhttpNews.send();
}

function showMoreFunction()
{
  var newsCardsAll=document.getElementById("allNewsCards");
  var cardArray=newsCardsAll.children;
  for(var j=0;j<cardArray.length;j++)
  {
    if(cardArray[j].className=="secondPageNewsCardExcess")
    {
      cardArray[j].style.display="flex";
    }
  }
  document.getElementById("showMoreButton").style.display="none";
  document.getElementById("showLessButton").style.removeProperty("display");
}

function showLessFunction()
{
  var newsCardsAll=document.getElementById("allNewsCards");
  var cardArray=newsCardsAll.children;
  for(var j=0;j<cardArray.length;j++)
  {
    if(cardArray[j].className=="secondPageNewsCardExcess")
    {
      cardArray[j].style.display="none";
    }
  }
  document.getElementById("showMoreButton").style.removeProperty("display");
  document.getElementById("showLessButton").style.display="none";
}

function collapseOrDetails(act)
{
  if(act.target.className=="x")
  {
    this.children[1].children[1].style.display="none";
    this.children[1].children[3].style.display="none";

    if(this.children[1].children[2].children.length==3)
    {
      this.children[1].children[2].children[1].style.display="";
      this.children[1].children[2].children[2].style.display="none";
    }
    act.target.style.display="none";
  }    
  else
  {
    this.children[1].children[1].style.removeProperty("display");
    this.children[1].children[3].style.removeProperty("display");
    if(this.children[1].children[2].children.length==3)
    {
      this.children[1].children[2].children[1].style.display="none";
      this.children[1].children[2].children[2].style.display="";
    }
    this.children[2].style.display="";
  }
}


function getTheSources()
{
  var categoryValue = document.getElementById("category").options[document.getElementById("category").selectedIndex].value;
  //console.log(document.getElementById("category").options[document.getElementById("category").selectedIndex].value);
  var selectSourceBox= document.getElementById("sources");
  
  var sourceFirstChild=selectSourceBox.firstChild;
  selectSourceBox.innerHTML="";
  selectSourceBox.appendChild(sourceFirstChild);
  // if(categoryValue!="All")
  // {
    var xmlhttpSources=new XMLHttpRequest();
    xmlhttpSources.open("GET","/getsources?Category="+categoryValue,true);
    xmlhttpSources.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttpSources.onreadystatechange = function() { // Call a function when the state changes.
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Request finished. Do processing here.
        var jobj=JSON.parse(xmlhttpSources.responseText);
        sourceArray=jobj.newsSources.sources;

        var selectSourceBox= document.getElementById("sources");
        var limitTen;
        if(sourceArray.length<10)
        {
          limitTen=sourceArray.length;
        }
        else
        {
          limitTen=10;
        }
        for(var i=0;i<limitTen;i++)
        {
          var optionName=sourceArray[i].name;
          var optionID=sourceArray[i].id;
          var sourceOption=document.createElement("option");
          sourceOption.value=optionName;
          sourceOption.id=optionID;
          sourceOption.appendChild(document.createTextNode(optionName));
          selectSourceBox.appendChild(sourceOption);
        }
    }
  }
    xmlhttpSources.send();
  // }
  
}




function slideLoad() {
  var xmlhttp=new XMLHttpRequest();
  xmlhttp.open("GET",'/getslide',true); // "synchronous” (deprecated because it freezes the page while waiting for a response) *
  xmlhttp.onreadystatechange = function(){
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
      var jsonObj= JSON.parse(xmlhttp.responseText);
      slide(jsonObj);
    }
  };
  xmlhttp.send();
 }

ctr=0;

function slide(jsonObj)
{
    slideArticles=jsonObj.slide;
    againSlide(slideArticles);
}

function againSlide(slideArticles)
{
  var currentArticle=slideArticles[ctr];
  var cUrl=currentArticle.url;
  var cImageUrl=currentArticle.urlToImage;
  var cTitle=currentArticle.title;
  var cDescription=currentArticle.description;
  var slideDiv=document.getElementsByClassName("slide")[0];
  var linkerUrl=document.getElementsByClassName("topDiv")[0].children[0];
  linkerUrl.href=cUrl;
  linkerUrl.target="_blank";
  slideDiv.children[0].src=cImageUrl;
  slideDiv.children[1].children[0].innerHTML=cTitle;
  slideDiv.children[1].children[1].innerHTML=cDescription;
  ctr=(ctr+1)%5;
  setTimeout("againSlide(slideArticles)",5000);
}



function cnnLoad() {
  var xmlhttpc=new XMLHttpRequest();
  xmlhttpc.open("GET",'/getcnn',true); // "synchronous” (deprecated because it freezes the page while waiting for a response) *
  xmlhttpc.onreadystatechange = function(){
    if(xmlhttpc.readyState==4 && xmlhttpc.status==200){
      var jsonObj= JSON.parse(xmlhttpc.responseText);
      cnnCard(jsonObj);
    }
  };
  xmlhttpc.send();
 }

function cnnCard(jsonObj)
{
    var cnnArticles=jsonObj.cnn;
    var cnnDiv=document.getElementById("Cnn");
    for(var j=0;j<4;j++)
    {
      var linkToCnnNews=document.createElement("a");
      linkToCnnNews.href=cnnArticles[j].url;
      linkToCnnNews.target="_blank";
      linkToCnnNews.style.textDecoration="None";
      linkToCnnNews.style.color="black";
      linkToCnnNews.style.width="24%";
      linkToCnnNews.style.marginLeft="3px";
      linkToCnnNews.style.marginRight="3px";


      var cardDiv=document.createElement("div");
      cardDiv.style.width="100%";
      cardDiv.style.height="100%";
      cardDiv.style.overflow="hidden";
      cardDiv.style.border="solid";
      cardDiv.style.borderWidth="1px";
      cardDiv.style.borderRadius="3px";
      cardDiv.style.borderColor="rgb(194, 194, 194)";
      cardDiv.style.backgroundColor="rgb(240, 236, 236)";
      
      var cardImage=document.createElement("img");
      
      var cardTitle=document.createElement("h4");
      cardTitle.appendChild(document.createTextNode(cnnArticles[j].title));
      cardTitle.style.fontWeight="bold";
      cardTitle.style.fontSize="10px";
      cardTitle.style.fontFamily="Georgia, 'Times New Roman', Times, serif";
      cardTitle.style.textAlign="center";

      var cardDescription=document.createElement("p");
      cardDescription.appendChild(document.createTextNode(cnnArticles[j].description));
      cardDescription.style.fontSize="8px";
      cardDescription.style.fontFamily="Georgia, 'Times New Roman', Times, serif";
      cardDescription.style.textAlign="center";

      cardImage.src=cnnArticles[j].urlToImage;
      cardImage.style.width="100%";
      cardImage.style.height="100%";

      var imageDiv=document.createElement("div");
      imageDiv.style.borderRadius="3px";
      imageDiv.style.width="100%";
      imageDiv.style.height="35%";
      imageDiv.appendChild(cardImage);

      cardDiv.appendChild(imageDiv);
      cardDiv.appendChild(cardTitle);
      cardDiv.appendChild(cardDescription);

      linkToCnnNews.appendChild(cardDiv);

      cnnDiv.appendChild(linkToCnnNews);
    }
    //setCorrectHeightForCnn();
}

/*
function setCorrectHeightForCnn()
{
  var cards=document.getElementById("Cnn");
  var maxHeight=0;
  for(var i=0;i<4;i++)
  {
    if(maxHeight<=cards.children[i].children[0].offsetHeight)
    {
      maxHeight=cards.children[i].children[0].offsetHeight;
      console.log(maxHeight);
    }
  }

  for(var i=0;i<4;i++)
  {  
    cards.children[i].children[0].setAttribute("height",toString(maxHeight)+"px");
    console.log(cards.children[i].children[0].style.height)
  }
}
*/

function foxLoad() {
  var xmlhttpf=new XMLHttpRequest();
  xmlhttpf.open("GET",'/getfox',true);
  xmlhttpf.onreadystatechange = function(){
    if(xmlhttpf.readyState==4 && xmlhttpf.status==200){
      var jsonObj= JSON.parse(xmlhttpf.responseText);
      foxCard(jsonObj);
    }
  };
  xmlhttpf.send();
 }

function foxCard(jsonObj)
{
    var foxArticles=jsonObj.fox;
    var foxDiv=document.getElementById("Fox");
    for(var j=0;j<4;j++)
    {
      var linkToFoxNews=document.createElement("a");
      linkToFoxNews.href=foxArticles[j].url;
      linkToFoxNews.target="_blank";
      linkToFoxNews.style.textDecoration="None";
      linkToFoxNews.style.color="black";
      linkToFoxNews.style.width="24%";
      linkToFoxNews.style.marginLeft="3px";
      linkToFoxNews.style.marginRight="3px";


      var cardDiv=document.createElement("div");
      cardDiv.style.width="100%";
      cardDiv.style.height="100%";
      cardDiv.style.border="solid";
      cardDiv.style.borderColor="rgb(194, 194, 194)";
      cardDiv.style.backgroundColor="rgb(240, 236, 236)";
      cardDiv.style.borderWidth="1px";
      cardDiv.style.borderRadius="3px";
      cardDiv.style.overflow="hidden";

      var cardImage=document.createElement("img");
      
      var cardTitle=document.createElement("h4");
      cardTitle.appendChild(document.createTextNode(foxArticles[j].title));
      cardTitle.style.fontWeight="bold";
      cardTitle.style.fontSize="10px";
      cardTitle.style.fontFamily="Georgia, 'Times New Roman', Times, serif";
      cardTitle.style.textAlign="center";

      var cardDescription=document.createElement("p");
      cardDescription.appendChild(document.createTextNode(foxArticles[j].description));
      cardDescription.style.fontSize="8px";
      cardDescription.style.fontFamily="Georgia, 'Times New Roman', Times, serif";
      cardDescription.style.textAlign="center";

      cardImage.src=foxArticles[j].urlToImage;
      cardImage.style.width="100%";
      cardImage.style.height="100%";

      var imageDiv=document.createElement("div");
      imageDiv.style.borderRadius="3px";
      imageDiv.style.width="100%";
      imageDiv.style.height="35%";
      imageDiv.appendChild(cardImage);

      cardDiv.appendChild(imageDiv);
      cardDiv.appendChild(cardTitle);
      cardDiv.appendChild(cardDescription);

      linkToFoxNews.appendChild(cardDiv);

      foxDiv.appendChild(linkToFoxNews);
    }


}

function wordCloudLoad() {
  var xmlhttp1=new XMLHttpRequest();
  xmlhttp1.open("GET",'/gettopwords',true); // "synchronous” (deprecated because it freezes the page while waiting for a response) *
  xmlhttp1.onreadystatechange = function(){
    if(xmlhttp1.readyState==XMLHttpRequest.DONE && xmlhttp1.status==200){
     var jsonObj= JSON.parse(xmlhttp1.response);
      wordCloud(jsonObj);
    }
  };
  xmlhttp1.send();
 }
function wordCloud(jsonObj)
{
    // List of words
    var myWords=jsonObj;
    //console.log(myWords);

    
var margin = {top: 0, right: 0, bottom: 0, left: 0},
    width = 200 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#mc").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Constructs a new cloud layout instance. It run an algorithm to find the position of words that suits your requirements
// Wordcloud features that are different from one word to the other must be here
var layout = d3.layout.cloud()
  .size([width, height])
  .words(myWords.map(function(d) { return {text: d.word, size:d.size}; }))
  .padding(3)        //space between words
  .rotate(function() { return ~~(Math.random() * 2) * 90; })
  .fontSize(function(d) { return d.size; })      // font size of words
  .on("end", draw);
layout.start();

// This function takes the output of 'layout' above and draw the words
// Wordcloud features that are THE SAME from one word to the other can be here
function draw(words) {
  svg
    .append("g")
      .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) {return d.size+"px"; })
        .style("fill", "black")
        .attr("text-anchor", "middle")
        .style("font-family", "Impact")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });
}

}