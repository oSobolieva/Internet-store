import goods from "./goods.js";

window.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".arrow-up").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    });

    document.querySelector(".menu__icon").addEventListener("click", function () {
        this.classList.toggle("menu__active");
        document.querySelector(".header__links").classList.toggle("header__links__active");
        document.body.classList.toggle("lock");
        document.getElementById("header__search").placeholder = "SEARCH HERE";
    })

    document.getElementById("header__search").addEventListener("input", function () {
        let value = this.value.trim();
        let variants = goods.map(el => el.name);
        let container = document.querySelector(".search__container");
        
        if (value != '') {
            container.innerHTML = '';
            variants.forEach((el) => {
                if (el.search(value) > -1) {
                    if (container.innerText.search(el) == -1) {
                        container.innerHTML += `<a href = "../page3/index.html">${el}</a><br>`;  
                    }
                    
                    container.classList.add("search__show");
                }
            })  
        } else {
            container.innerHTML = '';
            container.classList.remove("search__show");
        }
    })

    document.getElementById("header__search").addEventListener("blur", function () {
        this.value = '';
        document.body.addEventListener("click", function () {
            document.querySelector(".search__container").innerHTML = '';
        });
    })

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
    

    const [...btn] = document.querySelectorAll(".add-to-cart");
    btn.forEach(el => {
        el.addEventListener("click", () => {
            document.querySelector(".basket").classList.add("basket__active");
            document.body.classList.add("modal-lock");
            checkRepeatItems(8);
        })
    })
})