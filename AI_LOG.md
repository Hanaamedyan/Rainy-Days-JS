- Tool used: Claude
  Date: 3rd of August 2026
  Purpose: Project Planning
  Prompt: "Should I create a new repo and continue in my existing visual studio code project or create a new one?"
  Outcome: Discussed continuing in exiting HTML/CSS project rather than starting a new one

- Tool used: Claude
  Date: 3rd of August 2026
  Purpose: Project Planning
  Prompt: "What order should I build the JS files in and how should I organize my folders for an assignment like this compared to what I have now?"
  Outcome: Recommended I build my api.js first (since nothing works without the API), and confirmed /js subfolders like /product,
  /category, /checkout was a reasonable structure.

- Tool used: Claude
  Date: 3rd of August 2026
  Purpose: Project Planning
  Prompt: "How can I structure the shopping cart's state?"
  Outcome: Suggested I store the cart as an array of line-item objects (id,size,quantity, price) in localStorage, than manipulating storage in multiple places

- Tool used: Claude
  Date: 5th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "Can you explain what async/await does compared to .then()?"
  Outcome: Explained that async/await is syntax built on Promises that lets code read top-to-bottom, and that try/catch replaces
  .then()/.catch() chains for errors.

- Tool used: Claude
  Date: 5th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What is the difference between localStorage and sessionStorage?"
  Outcome: Explained that localStorage persists across browser sessions, while sessionStorage clears when the tab closes.

- Tool used: Claude
  Date: 5th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "How do custom events work in JavaScript?"
  Outcome: Explained that dispatchEvent/addEventListener with CustomEvent, lets modules like (nav badge,checkout page) react to cart changes without directly affecting each other.

- Tool used: Claude
  Date: 7th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What does the ES module actually do?"
  Outcome: Explained name versus default exports and how type="module" are runned once, with each file's variables scoped to the specific module unless it is exported.

- Tool used: Claude
  Date: 7th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What is the difference between querySelector and querySelectorAll?"
  Outcome: Explained querySelector returns the first matching element, while querySelectorAll returns a static NodeList of every match, that is why .forEach() works on the second and not the first.

- Tool used: Claude
  Date: 7th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What is FormData and why is it smart to use this?"
  Outcome: Explained that this collects all named form fields at once.

- Tool used: Claude
  Date: 10th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What is a closure?"
  Outcome: Explained that a closure remembers the variables from the scope it was created in.

- Tool used: Claude
  Date: 10th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What does URLSearchParams do?"
  Outcome: Explained that it parses every query string portion of a URL into a readable object, which is how the product page reads the ?id= value to know exactly what product to fetch.

- Tool used: Claude
  Date: 12th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What is the difference between innerHTML and createElement?"
  Outcome: Explained innerHTML is quicker for rendering repeated markup from a string and createElement is safer when you need to reference the new node.

- Tool used: Claude
  Date: 15th of August 2026
  Purpose: Debugging
  Prompt: "My nav bar layout is broken, what can be the problem?"
  Outcome: Found a missing closing </div>.

- Tool used: Claude
  Date: 18th of August 2026
  Purpose: Debugging
  Prompt: "My dropdown arrow does nothing!"
  Outcome: Found a CSS issue where where the border triangle was missing the solid keyword, making the arrow invisible.

- Tool used: Claude
  Date: 18th of August 2026
  Purpose: Debugging
  Prompt: "My cart items still show after the cart should be empty, why?"
  Outcome: Keyword hidden being overridden by a CSS rule.

- Tool used: Claude
  Date: 20th of August 2026
  Purpose: Debugging
  Prompt: "My cart count calculated the quantity righ the first time but not when adding more items"
  Outcome: Discussed to see if the calculation function was reading fresh data from storage or an old cached array.

- Tool used: Claude
  Date: 22nd of August 2026
  Purpose: Debugging
  Prompt: "My script is broken, what is the problem?"
  Outcome: Explained how an invalid named import is SyntaxError, which can prevent the entire module from executing, which is why nothing in the script ran.

- Tool used: Claude
  Date: 25th of August 2026
  Purpose: Debugging
  Prompt: "My cart badge is not updating when I add an item"
  Outcome: Traced it to a mismatched event name which was case sensitive, between where it was put and what is actually was listened for.

- Tool used: Claude
  Date: 25th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What does it mean when, cannot read properities of undefined?"
  Outcome: Explained that this usually means that the code is trying to access a property that came back undefined, most often from an API response that failed.

- Tool used: Claude
  Date: 28th of August 2026
  Purpose: Explaining JS Concepts
  Prompt: "What is let, const and var?"
  Outcome: Explained that var is function scoped, while let and const are block scoped, so they prevent reassignment.

- Tool used: Claude
  Date: 30th of August 2026
  Purpose: Debugging
  Prompt: "Why is my page only stuck on 'Loading products...'?"
  Outcome: Diagnosed that it might be a typo name that caused a silent mode failure, which was found via the DevTools Console tab.

- Tool used: Claude
  Date: 30th of August 2026
  Purpose: Debugging
  Prompt: "Why is my CSS not applying or working?"
  Outcome: Told me to look through my code to find cases of an earlier rule being overidden.

- Tool used: Claude
  Date: 2nd of September 2026
  Purpose: Accessibility
  Prompt: "What does aria-live actually do?"
  Outcome: Explained that it tells screen users to announce content changes automatically.

- Tool used: Claude
  Date: 4th of September 2026
  Purpose: Explaining JS Concepts
  Prompt: "What does classList.toggle do, can I not just add a class?"
  Outcome: Explained that the toggle adds the class is it is missing and removes when it is present in one call.

- Tool used: Claude
  Date: 4th of September 2026
  Purpose: Accessibility
  Prompt: "Is it bad/wrong to put a button inside an anchor tag?"
  Outcome: Confirmed yes - recommended using a real <button> element for the checkout.

- Tool used: Claude
  Date: 8th of September 2026
  Purpose: Explaining JS Concepts
  Prompt: "Can you tell me the difference between :focus and :focus-visible?"
  Outcome: Explained :focus-visble show an outline for keybord nav, not mouse clicks.

- Tool used: Claude
  Date: 9th of September 2026
  Purpose: Content Generation
  Prompt: "Can you give me a text for the Terms & Conditions and Privacy Policy page?"
  Outcome: Gave me a text for each page, which is also cited correctly.

- Tool used: Claude
  Date: 9th of September 2026
  Purpose: Course Clarification
  Prompt: "What counts as hardcoded product data?"
  Outcome: Explained that all product info had to come from the API response, while static UI is fine to hardcode.

- Tool used: Claude
  Date: 9th of September 2026
  Purpose: Debugging
  Prompt: "Why is my cart page only showing an error message instead of the actual product?"
  Outcome: Found out that the variable named sizeMarkup threw a ReferenceError that got caught by the try/catch.

- Tool used: Claude
  Date: 10th of September 2026
  Purpose: Debugging
  Prompt: "The try again error button looks right but it does nothing."
  Outcome: The button was rendered by a helper function, but the code path that used it was never attached by the click handler.

- Tool used: Claude
  Date: 10th of September 2026
  Purpose: Debugging
  Prompt: "querySelectorAll is not matching any elements but I see them in my HTML"
  Outcome: Found out that 'data-cart-count' was missing it's [].

- Tool used: Claude
  Date: 10th of September 2026
  Purpose: Course Clarification
  Prompt: "Is a loading indicator required for every async action?"
  Outcome: Confirmed that it is required for API calls, purely local actions like localStorage do not need since they are synchronous.

- Tool used: Claude
  Date: 11th of September 2026
  Purpose: Git
  Prompt: "How do I fix a failed git push when GitHub rejects my password?"
  Outcome: Walked through generating GitHub Tokens and using it in place of the account password.
