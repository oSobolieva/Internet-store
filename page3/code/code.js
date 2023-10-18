import goods from "../../code/goods.js"


window.addEventListener("DOMContentLoaded", () => {
    
//------------------------------- B A S K E T --------------------------
 const basketCloseButton = document.querySelector(".basket__close");
    basketCloseButton.addEventListener("click", () => {
        document.querySelector(".basket").classList.remove("basket__active");
        document.body.classList.remove("modal-lock");
    })


    function checkRepeatItems(i) {
        const basketBlock = document.querySelector(".basket__goods");
        let [...basketChildren] = basketBlock.children,
            isRepeat = true;

        if (basketChildren.length > 0) {
            for (let indx = 0; indx < basketChildren.length; indx++){
                if (basketChildren[indx].dataset.key == goods[i].number) {
                    let basketAmount = basketChildren[indx].children[2].children[1].textContent,
                    amount = +basketAmount;
                    basketChildren[indx].children[2].children[1].textContent = "" + ++amount;
                    changeSum(goods[indx].price, "+");
                    isRepeat = true;
                    break;
                } else {
                    isRepeat = false;
                }
            }

            if (isRepeat == false) {
                addBasketItem(i);
            }
        } else {
            addBasketItem(i);
        }

    }

        

function addBasketItem(i) {
        const basketBlock = document.querySelector(".basket__goods");
        let [...basketChildren] = basketBlock.children;

        let item = document.createElement("div");
        item.classList.add("basket__item");
        item.setAttribute("data-key", goods[i].number);

        let imgContainer = document.createElement("div"),
            image = document.createElement("img");
        imgContainer.classList.add("basket__img");
        image.setAttribute("src", goods[i].img);
        imgContainer.append(image);

        let name = document.createElement("p");
        name.classList.add("basket__item__name");
        name.textContent = goods[i].name;

        let counter = document.createElement("div"),
            btnPlus = document.createElement("button"),
            btnMinus = document.createElement("button"),
            amountBlock = document.createElement("p");
        
        counter.classList.add("basket__counter");
        amountBlock.classList.add("basket__amount");
        amountBlock.textContent = "1";
        btnPlus.setAttribute("type", "button");
        btnPlus.classList.add("basket__counter__btn");
        btnPlus.textContent = "+";
        btnPlus.addEventListener("click", () => {
            if (+amountBlock.textContent < goods[i].amount) {
                amountBlock.textContent = ++amountBlock.textContent;
                changeSum(goods[i].price, "+");
            } else {
                amountBlock.classList.add("basket__amount__red");
            }
        });
        btnMinus.setAttribute("type", "button");
        btnMinus.classList.add("basket__counter__btn");
        btnMinus.textContent = "-";
        btnMinus.addEventListener("click", () => {
            if (amountBlock.classList.contains("basket__amount__red")) {
                amountBlock.classList.remove("basket__amount__red");
            }
            amountBlock.textContent = --amountBlock.textContent;
            changeSum(goods[i].price, "-");

            if (+amountBlock.textContent == 0) {
                item.remove();
                if (basketChildren.length == 0) {
                    document.querySelector(".basket").classList.remove("basket__active");
                    document.body.classList.remove("modal-lock");
                }
            }
        });
        counter.append(btnMinus);
        counter.append(amountBlock);
        counter.append(btnPlus);
       
        let price = document.createElement("p");
        price.classList.add("basket__price");
        price.textContent = goods[i].price + "$";
        changeSum(goods[i].price, "+");
        
        
        item.append(imgContainer);
        item.append(name);
        item.append(counter);
        item.append(price);

        basketBlock.append(item);     
        
    }


    function changeSum(param, sign) {
        let basketSum = document.querySelector(".sum__number"),
            sumNow = +basketSum.textContent;
        
        if (isNaN(sumNow)) {
            sumNow = 0;
        }

        if (sign == "+") {
            sumNow += param;
        } else {
            sumNow -= param;
        }
        
        basketSum.textContent = sumNow.toFixed(2);
    }
    

    const btn = document.querySelector(".add-to-cart");
    btn.addEventListener("click", () => {
        document.querySelector(".basket").classList.add("basket__active");
        document.body.classList.add("modal-lock");
        checkRepeatItems(0);
    })


//------------------ CHANGE IMG ---------------------

    const front = document.getElementById("front"),
        back = document.getElementById("back"),
        mainImg = document.getElementById("main-img");
    
    front.addEventListener("click", function () {
        mainImg.src = "./img/image 10.png";
        this.classList.add("small__img__active");
        if (back.classList.contains("small__img__active")) {
            back.classList.remove("small__img__active");
        }
    })

    back.addEventListener("click", function () {
        mainImg.src = "./img/image 102.png";
        this.classList.add("small__img__active");
        if (front.classList.contains("small__img__active")) {
            front.classList.remove("small__img__active");
        }
    })
    
})
