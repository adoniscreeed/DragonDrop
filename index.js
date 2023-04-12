'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let items = document.querySelectorAll(".item");
    let placeholders = document.querySelectorAll(".placeholder");
    let choosedItem = null;
    let cardInput = document.querySelector(".item-text-input");
    let cardCreateButton = document.querySelector(".item-create-btn");
    let deleteBtns = document.querySelectorAll(".item__delete-btn");

    
    function dragSrart(event){
        event.target.classList.add("hold");
        choosedItem = event.target;
    }


    function dragEnd(event){
        event.target.classList.remove("hold");
        choosedItem = null;
    }


    function dragEnter(event){
        event.target.classList.add("hovered");
    }

    function dragLeave(event){
        event.target.classList.remove("hovered")
    }

    function drop(event){
        let placeholder = event.target;

        
        placeholder.classList.remove("hovered");
    }




    function deleteCard(e){
        e.target.parentElement.remove();

    }
    for(let i = 0; i<deleteBtns.length; i++){
        deleteBtns[i].addEventListener("click",deleteCard);
    }


    function createCard(){
        let card = document.createElement("div");
        card.classList.add("item");
        card.setAttribute("draggable",true);
        card.innerHTML = `
        <p class="item__text">${cardInput.value}</p>
        <span class="item__delete-btn">&times;</span>
        `;


        card.addEventListener("dragstart",dragSrart);
        card.addEventListener("dragend",dragEnd);
        card.querySelector(".item__delete-btn").addEventListener("click",deletesCard);

        cardInput.value = "";



        placeholders[0].append(card);

    }






    function dragOver(event){
        event.preventDefault();
        if(event.target.classList.contains("placeholder") && choosedItem){
            let nextCard = getNextCard(event.target,event.clientY);

            if (nextCard){
                nextCard.before(choosedItem);
            }else{
                event.target.append(choosedItem);
            }
            
        }
        


    }






    function getNextCard(placeholder,mouseY){
        let cards = placeholder.querySelectorAll(".item:not(.hold)");
        for( let i = 0; i<cards.length; i++){
            let card = cards[i];
            let boundes = card.getBoundingClientRect();
            if(boundes.y > mouseY){
                return card;
            }
        }
    }



    
    
    
    for(let i = 0; i<items.length;i ++){
        let item = items[i];

        item.addEventListener("dragstart",dragSrart);
        item.addEventListener("dragend",dragEnd);
    }

    for(let i=0;i<placeholders.length;i++){
        let placehplder = placeholders[i];

        placehplder.addEventListener("dragenter",dragEnter);
        placehplder.addEventListener("dragleave",dragLeave);
        placehplder.addEventListener("drop",drop);
        placehplder.addEventListener("dragover",dragOver);
    };
    


        cardCreateButton.addEventListener("click",createCard)





});