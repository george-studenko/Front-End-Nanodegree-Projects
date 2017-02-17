## Project 6: Website Performance Optimization

To run the website, download all files and open ```index.html``` with any browser.

### Optimizations on index.html

* Resized images to serve the right size and avoid transfering extra bytes
* Created a ```.htaccess``` file with the configurations to enable GZIP and Leverage Caching
* Set the ```async``` attribute to non critical Javascript files to avoid render blocking
* Download a copy of all images in order to server them with the best compression
* Set ```media="print"``` to the print.css file in order to avoid download when not needed
* Minified the HTML code
* Minified the css code and inlined it on inside the html

### Changes on views/js/main.js to improve the function that change the size of the pizzas

* To optimize the time to resize pizzas to less than 5 ms simplified the methods ```determineDx``` and ```changePizzaSizes``` to use a fixed % instead of the old calculation.
* Optimized the code to avoid repeating ```document.querySelectorAll(".randomPizzaContainer")``` all the time, assigning it into a variable and using ```getElementsByClassName``` instead
* Now we are only setting the image % size inside the for loop and not making all the previous calculations all over again
* Moved ```pizzasDiv``` variable outside the loop

### Changes on views/js/main.js to improve FPS on scrolling

* Created a global variable for all items that gets set only once right after creating all the elements
* Changed ```document.querySelectorAll``` for ```getElementsByClassName``` instead
* Took the ```document.body.scrollTop``` value outside of the loop to avoid invalidation
* Changed the amount of pizzas to create to 48 (that will be enough for 6 rows of pizzas)
* Added  ```transform: translateZ(0) ``` to the  ```mover ``` class to try enable hardware accelerated CSS when possible
