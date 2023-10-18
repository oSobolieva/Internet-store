import goods from "../../code/goods.js";


window.addEventListener("DOMContentLoaded", () => {

    document.querySelector(".arrow-up").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }); // <-- Back to top button

    // ---------------- PHONE ----------------
    document.querySelector(".menu__icon").addEventListener("click", function () {
        this.classList.toggle("menu__active");
        document.querySelector(".header__links").classList.toggle("header__links__active");
        document.body.classList.toggle("lock");
        document.getElementById("header__search").placeholder = "SEARCH HERE";
    })

    document.querySelector(".filter__button").addEventListener("click", function () {
        document.body.classList.add("lock");
        let filters = document.querySelector(".main__filters");
        filters.classList.add("main__filters__active");
        document.querySelector(".main__cards").addEventListener("click", function () {
            filters.classList.remove("main__filters__active");
            document.body.classList.remove("lock");
        })
    })


    //-------------------SEARCH-------------------
    document.getElementById("header__search").addEventListener("input", function () {
        let value = this.value.trim();
        let variants = goods.map(el => el.name);
        let container = document.querySelector(".search__container");
        
        if (value != '') {
            container.innerHTML = '';
            variants.forEach((el) => {
                if (el.search(value) > -1) {
                    if (container.innerText.search(el) == -1) {
                        container.innerHTML += `<a href = "./../index.html">${el}</a><br>`;
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

    document.getElementById("main-search").addEventListener("input", function () {
        let value = this.value.trim();
        let variants = goods.map(el => el.name);
        let container = document.querySelector(".main-search__container");
        
        if (value != '') {
            container.innerHTML = '';
            variants.forEach((el) => {
                if (el.search(value) > -1) {
                    if (container.innerText.search(el) == -1) {
                        container.innerHTML += `<a href = "./../index.html">${el}</a><br>`;
                    }
                    
                    container.classList.add("main-search__show");
                }
            })
        } else {
            container.innerHTML = '';
            container.classList.remove("main-search__show");
        }
    })

    document.getElementById("main-search").addEventListener("blur", function () {
        this.value = '';
        document.body.addEventListener("click", function () {
            document.querySelector(".main-search__container").innerHTML = '';
        });
    })


    //------------------- filter dropdown list -----------------
    const [...filterArrows] = document.querySelectorAll("#filter-arrow");

    filterArrows.forEach((el, ind) => {
        el.addEventListener("click", function () {
            this.classList.toggle("arrow-rotate");

            switch (ind) {
                case 0:
                    document.querySelector("#filter-sizes").classList.toggle("filter__block__active");
                    document.querySelector("#filter-sizes").classList.toggle("filter__block");
                    break;
                case 1:
                    document.querySelector("#filter-colors").classList.toggle("filter__block__active");
                    document.querySelector("#filter-colors").classList.toggle("filter__block");
                    break;
                case 2:
                    document.querySelector("#filter-rating").classList.toggle("filter__block__active");
                    document.querySelector("#filter-rating").classList.toggle("filter__block");
                    break;
                case 3:
                    document.querySelector("#filter-inseam").classList.toggle("filter__block__active");
                    document.querySelector("#filter-inseam").classList.toggle("filter__block");
                    break;
                case 4:
                    document.querySelector("#filter-fabric").classList.toggle("filter__block__active");
                    document.querySelector("#filter-fabric").classList.toggle("filter__block");
                    break;
                case 5:
                    document.querySelector("#filter-collections").classList.toggle("filter__block__active");
                    document.querySelector("#filter-collections").classList.toggle("filter__block");
                    break;
            }
        })
    })



    //---------------------------------- FILTERS ----------------------------
    
    const [...sizes] = document.querySelectorAll(".size-label"),
        [...colors] = document.querySelectorAll(".color-label"),
        [...ratings] = document.querySelectorAll(".star-label");
    
    sizes.forEach((elem) => {
        elem.addEventListener("click", function () {
            const cardsContainer = document.querySelector(".main__cards");
            cardsContainer.innerHTML = '';

            goods.forEach((el, ind) => {
                if (el.sizes.includes(+this.textContent)) {
                    createCard(ind);
                    
                }
            })
            
        })
    })
    
    colors.forEach((elem) => {
        elem.addEventListener("click", function () {
            const cardsContainer = document.querySelector(".main__cards");
            cardsContainer.innerHTML = '';

            goods.forEach((el, ind) => {
                if (el.colors.includes(chooseColor(elem.getAttribute("for")))) {
                    createCard(ind);
                   
                }
            })

        })
    })

    ratings.forEach((elem) => {
        elem.addEventListener("click", function () {
            const cardsContainer = document.querySelector(".main__cards");
            cardsContainer.innerHTML = '';

            goods.forEach((el, ind) => {
                if (el.rating == +this.textContent) {
                    createCard(ind);
                }
            })

        })
    })

    function chooseColor(color) {
        switch (color) {
            case "color1":
                return "black";
            case "color2":
                return "#744524";
            case "color3":
                return "#113EB1";
            case "color4":
                return "green";
            case "color5":
                return "gray";
            case "color6":
                return "#E59500";
            case "color7":
                return "white";
        }
    }


    //------------------------------PAGINATION--------------------------

    function createCard(i) {
        const cardsContainer = document.querySelector(".main__cards");

        let imgContainer = document.createElement("div"),
            image = document.createElement("img");
        imgContainer.classList.add("card__img");
        image.setAttribute("src", goods[i].img);
        imgContainer.append(image);

        let name = document.createElement("p");
        name.classList.add("card__name");
        name.textContent = goods[i].name;

        let rating = document.createElement("div")
        rating.classList.add("card__rating");
        rating.innerHTML = chooseRating(goods[i].rating);

        let price = document.createElement("p")
        price.classList.add("card__price");
        price.textContent = "As low as";
        let priceBold = document.createElement("span")
        priceBold.classList.add("card__bold");
        priceBold.textContent = ` $${goods[i].price.toFixed(2)}`;
        price.append(priceBold);

        let colors = document.createElement("div");
        colors.classList.add("card__colors");
        goods[i].colors.forEach((el) => {
            let color = document.createElement("div");
            color.classList.add("card__color");
            color.style.backgroundColor = el;

            colors.append(color);
        })

        let btn = document.createElement("button");
        btn.setAttribute("type", "button");
        btn.classList.add("add-to-cart");
        btn.textContent = "ADD TO CART";

        btn.addEventListener("click", () => {
            document.querySelector(".basket").classList.add("basket__active");
            document.body.classList.add("modal-lock");
            checkRepeatItems(i);
        })

        let link = document.createElement("a");
        link.setAttribute("href", "../page3/index.html");
        link.append(imgContainer);

        let card = document.createElement("div");
        card.classList.add("main__card");
        card.append(link);
        card.append(name);
        card.append(rating);
        card.append(price);
        card.append(colors);
        card.append(btn);

       
        cardsContainer.append(card);
    }


    function chooseRating(amount) {
        switch (amount) {
            case 1:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="135%" viewBox="0 0 150 25" fill="none">
                                <path d="M12.1795 0L15.7587 7.25312L23.7629 8.41582L17.9708 14.0612L19.3384 22.0329L12.1795 18.2688L5.02056 22.0329L6.38819 14.0612L0.596107 8.41582L8.60027 7.25312L12.1795 0Z"
                                    fill="#FFCC48"/>
                                <path d="M43.5898 0L47.169 7.25312L55.1731 8.41582L49.3811 14.0612L50.7487 22.0329L43.5898 18.2688L36.4308 22.0329L37.7985 14.0612L32.0064 8.41582L40.0105 7.25312L43.5898 0Z"
                                    fill="#BCBCCC"/>
                                <path d="M75 0L78.5792 7.25312L86.5834 8.41582L80.7913 14.0612L82.1589 22.0329L75 18.2688L67.8411 22.0329L69.2087 14.0612L63.4166 8.41582L71.4208 7.25312L75 0Z"
                                    fill="#BCBCCC"/>
                                <path d="M106.41 0L109.989 7.25312L117.994 8.41582L112.202 14.0612L113.569 22.0329L106.41 18.2688L99.2513 22.0329L100.619 14.0612L94.8269 8.41582L102.831 7.25312L106.41 0Z"
                                    fill="#BCBCCC"/>
                                <path d="M137.82 0L141.4 7.25312L149.404 8.41582L143.612 14.0612L144.979 22.0329L137.82 18.2688L130.662 22.0329L132.029 14.0612L126.237 8.41582L134.241 7.25312L137.82 0Z"
                                    fill="#BCBCCC"/>
                            </svg>`;
            case 2:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="135%" viewBox="0 0 150 25" fill="none">
                                <path d="M12.1795 0L15.7587 7.25312L23.7629 8.41582L17.9708 14.0612L19.3384 22.0329L12.1795 18.2688L5.02056 22.0329L6.38819 14.0612L0.596107 8.41582L8.60027 7.25312L12.1795 0Z"
                                    fill="#FFCC48"/>
                                <path d="M43.5898 0L47.169 7.25312L55.1731 8.41582L49.3811 14.0612L50.7487 22.0329L43.5898 18.2688L36.4308 22.0329L37.7985 14.0612L32.0064 8.41582L40.0105 7.25312L43.5898 0Z"
                                    fill="#FFCC48"/>
                                <path d="M75 0L78.5792 7.25312L86.5834 8.41582L80.7913 14.0612L82.1589 22.0329L75 18.2688L67.8411 22.0329L69.2087 14.0612L63.4166 8.41582L71.4208 7.25312L75 0Z"
                                    fill="#BCBCCC"/>
                                <path d="M106.41 0L109.989 7.25312L117.994 8.41582L112.202 14.0612L113.569 22.0329L106.41 18.2688L99.2513 22.0329L100.619 14.0612L94.8269 8.41582L102.831 7.25312L106.41 0Z"
                                    fill="#BCBCCC"/>
                                <path d="M137.82 0L141.4 7.25312L149.404 8.41582L143.612 14.0612L144.979 22.0329L137.82 18.2688L130.662 22.0329L132.029 14.0612L126.237 8.41582L134.241 7.25312L137.82 0Z"
                                    fill="#BCBCCC"/>
                            </svg>`;
            case 3:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="135%" viewBox="0 0 150 25" fill="none">
                                <path d="M12.1795 0L15.7587 7.25312L23.7629 8.41582L17.9708 14.0612L19.3384 22.0329L12.1795 18.2688L5.02056 22.0329L6.38819 14.0612L0.596107 8.41582L8.60027 7.25312L12.1795 0Z"
                                    fill="#FFCC48"/>
                                <path d="M43.5898 0L47.169 7.25312L55.1731 8.41582L49.3811 14.0612L50.7487 22.0329L43.5898 18.2688L36.4308 22.0329L37.7985 14.0612L32.0064 8.41582L40.0105 7.25312L43.5898 0Z"
                                    fill="#FFCC48"/>
                                <path d="M75 0L78.5792 7.25312L86.5834 8.41582L80.7913 14.0612L82.1589 22.0329L75 18.2688L67.8411 22.0329L69.2087 14.0612L63.4166 8.41582L71.4208 7.25312L75 0Z"
                                    fill="#FFCC48"/>
                                <path d="M106.41 0L109.989 7.25312L117.994 8.41582L112.202 14.0612L113.569 22.0329L106.41 18.2688L99.2513 22.0329L100.619 14.0612L94.8269 8.41582L102.831 7.25312L106.41 0Z"
                                    fill="#BCBCCC"/>
                                <path d="M137.82 0L141.4 7.25312L149.404 8.41582L143.612 14.0612L144.979 22.0329L137.82 18.2688L130.662 22.0329L132.029 14.0612L126.237 8.41582L134.241 7.25312L137.82 0Z"
                                    fill="#BCBCCC"/>
                            </svg>`;
            case 4:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="135%" viewBox="0 0 150 25" fill="none">
                                <path d="M12.1795 0L15.7587 7.25312L23.7629 8.41582L17.9708 14.0612L19.3384 22.0329L12.1795 18.2688L5.02056 22.0329L6.38819 14.0612L0.596107 8.41582L8.60027 7.25312L12.1795 0Z"
                                    fill="#FFCC48"/>
                                <path d="M43.5898 0L47.169 7.25312L55.1731 8.41582L49.3811 14.0612L50.7487 22.0329L43.5898 18.2688L36.4308 22.0329L37.7985 14.0612L32.0064 8.41582L40.0105 7.25312L43.5898 0Z"
                                    fill="#FFCC48"/>
                                <path d="M75 0L78.5792 7.25312L86.5834 8.41582L80.7913 14.0612L82.1589 22.0329L75 18.2688L67.8411 22.0329L69.2087 14.0612L63.4166 8.41582L71.4208 7.25312L75 0Z"
                                    fill="#FFCC48"/>
                                <path d="M106.41 0L109.989 7.25312L117.994 8.41582L112.202 14.0612L113.569 22.0329L106.41 18.2688L99.2513 22.0329L100.619 14.0612L94.8269 8.41582L102.831 7.25312L106.41 0Z"
                                    fill="#FFCC48"/>
                                <path d="M137.82 0L141.4 7.25312L149.404 8.41582L143.612 14.0612L144.979 22.0329L137.82 18.2688L130.662 22.0329L132.029 14.0612L126.237 8.41582L134.241 7.25312L137.82 0Z"
                                    fill="#BCBCCC"/>
                            </svg>`;
            case 5:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="135%" viewBox="0 0 150 25" fill="none">
                                <path d="M12.1795 0L15.7587 7.25312L23.7629 8.41582L17.9708 14.0612L19.3384 22.0329L12.1795 18.2688L5.02056 22.0329L6.38819 14.0612L0.596107 8.41582L8.60027 7.25312L12.1795 0Z"
                                    fill="#FFCC48"/>
                                <path d="M43.5898 0L47.169 7.25312L55.1731 8.41582L49.3811 14.0612L50.7487 22.0329L43.5898 18.2688L36.4308 22.0329L37.7985 14.0612L32.0064 8.41582L40.0105 7.25312L43.5898 0Z"
                                    fill="#FFCC48"/>
                                <path d="M75 0L78.5792 7.25312L86.5834 8.41582L80.7913 14.0612L82.1589 22.0329L75 18.2688L67.8411 22.0329L69.2087 14.0612L63.4166 8.41582L71.4208 7.25312L75 0Z"
                                    fill="#FFCC48"/>
                                <path d="M106.41 0L109.989 7.25312L117.994 8.41582L112.202 14.0612L113.569 22.0329L106.41 18.2688L99.2513 22.0329L100.619 14.0612L94.8269 8.41582L102.831 7.25312L106.41 0Z"
                                    fill="#FFCC48"/>
                                <path d="M137.82 0L141.4 7.25312L149.404 8.41582L143.612 14.0612L144.979 22.0329L137.82 18.2688L130.662 22.0329L132.029 14.0612L126.237 8.41582L134.241 7.25312L137.82 0Z"
                                    fill="#FFCC48"/>
                            </svg>`;
        }
    }


    function showCards(page, amount) {
        page--;
        const cardsContainer = document.querySelector(".main__cards");
        cardsContainer.innerHTML = '';

        let start = page * 10,
            end = start + amount;

        for (let i = start; i < end; i++) {
            createCard(i);
        }
    }


    function createPaginationBlock(amount, lastPage) {
        const paginationContainer = document.querySelector(".pagination");
        
        for (let i = 1; i <= amount; i++) {
            let paginationBlock = document.createElement("p");
            paginationBlock.classList.add("pagination__block");
            if (i == 1) {
                paginationBlock.classList.add("pagination__block__active");
            }
            paginationBlock.textContent = i;

            paginationBlock.addEventListener("click", function () {
                let [...paginationChildren] = paginationContainer.children;
                paginationChildren.forEach((el) => {
                    if (el.classList.contains("pagination__block__active")) {
                        el.classList.remove("pagination__block__active");
                    }
                })
                this.classList.add("pagination__block__active");

                if (i != amount) {
                    showCards(i, 10);
                } else {
                    showCards(i, lastPage);
                }
                
                window.scrollTo({
                    top: 120,
                    behavior: "smooth"
                })
            });

            paginationContainer.append(paginationBlock);
        }

        if (amount > 1) {
            let paginationArrow = document.createElement("p");
            paginationArrow.classList.add("pagination__block");
            paginationArrow.classList.add("pagination__arrow");

            paginationArrow.addEventListener("click", () => {
                let [...paginationChildren] = paginationContainer.children;

                for (let i = 0; i < paginationChildren.length - 2; i++) {
                    if (paginationChildren[i].classList.contains("pagination__block__active")) {
                        paginationChildren[i].classList.remove("pagination__block__active");
                        paginationChildren[i].nextElementSibling.classList.add("pagination__block__active");
                        
                        let indx = i + 2;
                        if (indx != amount) {
                            showCards(indx, 10);
                        } else {
                            showCards(indx, lastPage);
                        }

                        return;
                    }
                }


            });

            paginationContainer.append(paginationArrow);
        }
    }

    let amountPages = Math.ceil(goods.length / 10),
        forLastPage = String(goods.length / 10).slice(2);
    createPaginationBlock(amountPages, +forLastPage);
    showCards(1, 10);

     //----------------------------------- BASKET ------------------------

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
    
})