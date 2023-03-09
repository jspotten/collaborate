# startup
CS 260 - Startup Project Repository


Key Things Learned:
- How to create a new repository in Github and clone it into a specific directory.
- Committing changes to a readMe file from Github and its location on my computer and pulling those changes from either end.
- Pushing changes made in the local directory to Github.
- Merging changes when a commit is made in Github and in the local directory.
  
  
Elevator Pitch:
So often in our lives, whether on our own or when working with others, we find it hard to keep our responsibilities in order. We try to maintain a list in our head and end up forgetting something important. Or when working with a team, we lose track of all the current tasks being worked on and don't know what needs to be done. The solution to each of these dillemmas and many more can be described with one word: collaborate. Collaborate is a product which enables one to record tasks and check them off once they're done. It also encourages organization with the ability to group tasks together into lists. Lists which can be shared across a team to ensure collaboration and transparency. As soon as you choose to collaborate and organize yourself, what was a stress will be replaced with fulfillment and satisfaction.

![CS 260 - Startup Sketch](https://user-images.githubusercontent.com/116193374/214912795-f10228db-c09d-4bcb-b283-5b87e9b6aee5.png)

Startup Key Features:
- Secure login with a profile for the person.
- Ability to create task lists with a name.
- Viewing screen for both the lists and for the tasks in each list.
- Add a task with a description and due date.
- Delete individual tasks.
- Check a task off and have it move from in progress section to completed.
- A way to transition a completed task back to in progress.
- Scroll bar for both in progress and completed section for tasks.
- Task list sharing with other people allowing for collaboration.
- Notifies other users who have shared access to a list that a task was completed by a specific person or that someone accepted an invite to join the task list.
- (Optional) Incorporate some way of creating task reminders.
   
   
Server Startup:
- Elastic IP Address: 3.142.167.250
- ssh -i [key pair file] ubuntu@[ip address]
- `chmod  600 [key pair file]`
- I have been working as an intern for a Internet Security company so it has been cool to make some connections with the ISP things I have been doing there with this class. For example, understanding that 0.0.0.0 enables any IP to access something like a server or how an IP ended in .1 would be the network. I look forward to what will come next.
   
   
Route 53 Setup:
- I learned how to purchase my own domain with a specified/available TLD and from there was able to associate it with my server's public IP address.
- In addition, I was also able to add a record to make sure that no matter what subdomain is tagged onto the front of my domain.TLD, that it will still route to my server.
- Website domain: http://cs-260.click
   
   
Web Certificate Setup:
- When trying to use an ssh key to access a webserver, make sure to either navigate to the directory where it exists or find the correct path to it.
- On windows home doesn't exist so '~' doesn't work to bring you to the C drive.
- Inside of a Caddyfile, when using vi, if you want to edit its contents make sure that you see INSERT the bottom. Otherwise, hit 'i' and it will enable that mode.
- To leave a mode, hit ESC.
- When saving and quiting, make sure you are not in some mode and type at the bottom :wq and then hit enter; another option is ZZ.
- Once you're back in ubuntu, if you get the "There are stopped jobs" message preventing you from exiting, ctrl + z will terminate any ongoing stopped jobs.
   
   
HTML:
- [&nbsp]; is the escape sequence for adding a blank space which doesn't add a new line.
   
   
Simon Project:
- I learned how to adjust the height and width of an image that I've inserted into a webpage with HTML.
- After doing some googling, I figured out how to adjust the text size for certain pieces of text within in HTML tags.
- Found out how to update some of ubuntu files through ssh.
- Familiarized myself more with some of the unique HTML tags and their corresponding attributes.
   
   
CSS Practice:
- Learned how to remove a vertical scroll bar by doing the following: overflow-y: hidden;
- Figured out how to rotate text x number of degrees around a point by using the rotate function in the transform class.
- How to center text inside of a shape and how to create a circle element inside of CSS.
- Changing the position using the relative keyword and adjusting the positioning using top, right, bottom, and left.
   
   
CSS Flex:
- Flex can be a bit difficult to use in combination with the margin and position properties.
- Can use margin to make sure there is space between grid elements and the outer edge of a flex element when you use the grid option for display for a child which has a parent using the flex option instead.
   
   
CSS Simon:
- The hyperlinks in the navbar menu element are not blackend and appear somewhat lighter unless you add the "active" keyword to the     nav-item when you are currently at the hyperlink's webpage.
- Margins can also have four directional values for top right left bottom.
- border-radius determines how rounded shape elements or text boxes are.
- You use row for flex-direction when you want the flex items to appear in one row and column if you want them to appear one after the other in a vertical column.
- min/max-height and min/max-width are used to restrict a an element from surpassing either a lower or upper size bound.
- If you want to restrict a paragraph line from extending to far on one line, you can set a max-wdith and add a character max(ch).
- Applying a theme to the thread tag doesn't necessarily work, so you can instead apply it to the tr tag for the info row.

   
CSS/HTML Startup:
- You can change just about any property, if not every property, using media for a change in the webpages size.
- The "card" class is very useful for creating a background box to contain and provide a backdrop for other elements.
- Use "::-webkit-input-placeholder" as a block in CSS to adjust the input placeholder alignment, text size, weight, etc.
- .cursor-center CSS class with text alignment set to center starts the cursor at the center of an input box.
- The following is used to link button clicks to other webpages: onclick = "window.location.href = '[nameOfFile].html';".
   
   
JS Functions, Arrow Functions, Arrays, and Objects/Classes:
- Functions are used with the keyword function followed by the name of the function and parentheses with no or some parameters.
- Arrow functions must have curly brackets if they have more than one line otherwise they can be as simple as () = > [one line of code];.
- To get the output of an arrow function do the following: (() => [line of code])().
- Class member variables and functions are made private using a #.
- Classes do not declare their member variables outside of the constructor. They are defined and initialized in the constructor using this. followed by the name that you want to give it and set equal to either a specific value or a corresponding input.
   
   
JS Regex, Rest, Spread, and Destructuring:
- Regular expressions: textual pattern matchers; patterns used to match character combinations in strings. You can use them to find text in a string so that you can replace it, or simply know that it exists.
- Regex can be created either by using either the RegExp class constructor or a regular expression literal.
- Rest: prefixing the last parameter for a function with three dots allows for any number of parameters to be received and then converted into an array.
- Spread: prefixing an object or array with three dots before passing it to a function will match up each member variable or element to the function's parameters.
- Destructuring: the process of pulling individual items out of an existing one, or removing structure. This can be done with either arrays or objects.
   
   
Simon JavaScript:
- To store something locally, create a new variable to store an HTML element, and then write following: localStorage.setItem("[referenceName]", varEl.value).
- Once loaded to a local storage, call .getItem on localStorage with the given reference name to get the data stored.
- This will enable you to have a local reference to the value associated with an HTML element and be able to adjust it with a JavaScript.
- To retrive an element, you can either use querySelector("[#idName]") or getElementByClass("[classname]") if you want to reference its' class.
- querySelectAll with retrieve all elements with a certain id or class name.
- Use [nameOfElement].textContent to get a textual representation of a specific element.
- Buttons can be pressed with .press for a specified amount of time when applied to a button in a given moment.
- await allows us to enable things to run in the background even while the user may be on another page or is doing something else.
- JavaScript has built in capabilities for deserializing JSON strings and serializing JS code.
- [someArray].splice makes it possible to insert or disect arrays as you please.
- If you plan to initialize class member variables without using a variable with an identical name, then the member variables must be declared outside of constructor.
- It seems that you can include just an object in an if statement, and if the object has data, then it will return true, otherwise false.
- HTML elements can have be filled with other children with appendChild or by setting its innerHTML to a string of HTML code which builds the structures.
- Having const [var1, var2. ...] enables one to have variables that update as one iterates through an array of objects using a for loop.
<br></br>
<br></br>
<h3>MIDTERM EXAM NOTES</h3>

<h4>Development Essentials</h4>

<h5>Internet History</h5>

- Three Distinct Phases of Web Programming:
  - Formation of the internet that supports the communication of web applications.
  - The creation of HTML and HTTP that made it possible to share hyperlinked documents.
  - Creation of CSS and JavaScript that enabled interactive web applications.
- Internet Management Controlled by Two Major Organizations:
  - Internet Engineering Task Force (IETF): defines the technical standards that specify how the physical network communicates.
  - Internet Corporation for Assigned Names and Numbers (ICANN): oversees both the Internet Protocol (IP) address space and the Domain Name System (DNS)
    - These two databases form the address book of the internet.
- Hypertext Markup Language (HTML):
  - Key innovations of HTML was the idea that documents could be interconnected with what are called hyperlinks which enable immediate access to related docs.
  - Contains over 100 elements or tags at the moment.
- Hypertext Transfer Protocol (HTTP):
  - Example: http://info.cern.ch/hypertext/WWW/Helping.html
- Uniform Resource Locator (URL):
  - Example: GET /hypertext/WWW/Helping.html HTTP/1.1
             Host: info.cern.ch
             Accept: text/html
- These two definitions specify how web documents are addressed and transmitted across the internet.
- Cascading Style Sheets (CSS): designed to give HTML documents visual styling independent of the content's structure.
- JavaScript (JS): gave the ability to script web pages.
  - Turns a static web into an interactive experience where a web page could dynamically change based upon a user's interaction.
  - Node.js: first successful application for deploying JS outside of a browser.
  - Standardization of common object notation JSON, a typed variant named TypeScript and other transpilers for converting languages into ECMAScript(JS).
 
<h5>Technology Stack</h5>

- Collection of technologies used to create or deliever a web application is called a technology stack.
- At the top is generally the web framework (Angular, React, Vue, Svelte): it communicates with one or more web services to provide authentication, business data, and persistent storage. It then uses backend services such as caching, database, logging, and monitoring.
- Example Technology Stack: React for the web framework, talking to Caddy as the web server hosted on AWS, running web services with Node.js, and MongoDB as the database hosted on MongoDB Atlas.
- Be careful when building a commercial stack as you will need to think about dependability, support, scalability, performance, security, and development productivity factors such as documentation, ease of use, common acceptance, community support, build times, and testing integration.

<h5>The Console</h5>  

- Also known as the command line, shell, or terminal the console window provides access to the file system and allows for the execution of command line applications.
- POSIX compliance: supports a standard set of console commands. (any necssary console commansd work on the operating systems with that compliance)
- A primary purpose for a console application is to view files on the computer. The files are organized into a tree structure of nodes called directories.
- You can see which directory you are in with the 'pwd' (present working directory) command.
- You can list all of the files in the director with 'ls' (list files).
- Most command line applications take parameters that are specified after you type the application name.
- 'ls' can list files (even hidden ones) in a long format if you provide '-la' after 'ls'.
- List of Basic Commands:
  - echo - Output the parameters of the command
  - cd - Change directory
  - mkdir - Make directory
  - rmdir - Remove directory
  - rm - Remove file(s)
  - mv - Move file(s)
  - cp - Copy files
  - ls - List files
  - curl - Command line client URL browser
  - grep - Regular expression search
  - find - Find files
  - top - View running processes with CPU and memory usage
  - df - View disk statistics
  - cat - Output the contents of a file
  - less - Interactively output the contents of a file
  - wc - Count the words in a file
  - ps - View the currently running processes
  - kill - Kill a currently running process
  - sudo - Execute a command as a super user (admin)
  - ssh - Create a secure shell on a remote computer
  - scp - Securely copy files to a remote computer
  - history - Show the history of commands
  - ping - Check if a website is up
  - tracert - Trace the connections to a website
  - dig - Show the DNS information for a domain
  - man - Look up a command in the manual
- Chain Input and Output of Commands Using Special Characters:
  - '|' - take the output from the command on the left and pipe, or pass, it to the command on the right.
  - '>' - redirect output to a file; overwrites the file if it exists.
  - '>>' - redirect output to a file; appends if the file exists.
- Console Keystrokes:
  - 'CTRL-R': use type ahead to find previous commands.
  - 'CTRL-C': kill the currently running command.

<h5>Git</h5>

- Git provides two valuable functions:
  - First it allows you to track versions of files in a directory.
  - Second, it allows you to clone all of those versions to a differnt location, usually to a differnt computer.
- Create a new directory and initialilze it as a Git repository:
  - ➜  mkdir playingWithGit
  - ➜  cd playingWithGit
  - ➜  git init
- If you list all of the files you wil see that you now have a hidden directory named .git.
- Use 'echo' to create a file and then after creation, 'git status' to tell you what git is doing.
- To begin tracking versions, you have add a file using 'git add .'.
- It will then tell you it has staged the file an dit is ready to be committed as a version in the repository.
- We commit a version of a file with the 'commit' command.
- You always have to add a meaningful commment about the version being committed so using '-m' will provide a message that will live with the version.
- To tell Git we want to add all the tracked modified files to our commit, we include the '-a' parameter along with our message parameter ('-am').
- We can view the versions in our repository with the 'git log' command.
- Every commit has a unique identifier generated by hashing the file along with the timestamp using the SHA hasing alogorithm.
- This is very useful if you ever want to refer to a specific commit in your version history by using its SHA.
- If we want to temporarily switch back to a previous version to see what it contains, we can use 'git checkout [first few characters of SHA]'.
- To get back to the top of the version chain, use the 'checkout' command and reference the branch name which is by default 'master'.
- In most cases, we don't want to reverse back to an earlier commit and instead just want to compare differences between commits.
- We do that with the 'diff' command:
  - Specify two SHAs that you want to compare or you can use HEAD which points to the top of the commit change.
  - To refer to earlier commits, just add '~' and the numerical distance from head that you want to reference.
- Branches can be created if you would like to work on variations of the code while allowing progress on the main branch.
  - Use the command 'git branch [nameOfNewBranch]' and then 'git checkout [nameOfNewBranch]' to start working on the new branch.
- When you want to combine the work done on both branches, you checkout the master branch and execute 'git merge [nameOfSeperateBranch]'.

<h5>Development & Production Environments</h5>

- It is critical to separate where you develop your application, from where the production release of your application is made publicly available.
- Multiple environments to contain the development of code to divide up the stages involved in making software ready to be realized publicly.
- Continuous Integration (CI) processes checkout the code, lint it, build it, test it, stage it, test it more, and finally, releases it to the production environment if everything checks out, notifying different departments of the releae.
- You run a deployment script from a console window in your development window with a command like the following:
  - ./deployService.sh -k ~/prod.pem -h yourdomain.click -s simon
- The '-k' parameter provide the credential file necessary to access your production environment.
- The '-h' parameter is the domain name of your production environment.
- The '-s' parameter represents the name of the application you are deploying (such as simon or startup).

<h4>Web Servers</h4>

<h5>The Internet</h5>

- The internet can be thought of as a massive redundant collection of wires that connect up all of the computers in the world.
- A lot of the wires are wireless (wiFi, satellite, or cell), and not all of the computers in the worl are connected.
- When a device wants to talk to another device, it must have an IP address (e.g. 128.187.16.184).
- A symbolic name for an IP address is called a domain name: domain names are converted to IP addresses by doing a lookup in the Domain Name System (DNS).
- You can look up the IP address for any domain name using the 'dig' console utility.
- Next, you connect to the device by first requesting a connection route to the device.
- Connetion Route: consists of multiple hops across the network until the destination is dynamically and discovered and the connection established.
- The hops can be determined using the 'traceroute' console utility.
- Internet Service Provider (ISP)
- Actual sending of data across the internet uses the TCP/IP model: a layered architecture that covers everything from physical wires to the data that a web application sends.
- TCP/IP Architecture:
  - Layers: Application, Transport, Internet, and Link.
  - Example: HTTPS, TCP, IP, and Fiber/Hardware.
  - Purpose: Functionality like web browsing, moving connection information packets, establishing connections, and physical connections.
 
 <h5>Web Servers</h5>
 
 - Web server: a computing device that is hotsing a web service that knows how to accept incoming internet connections and speak the HTTP application protocol.
 - We can run a web service code and use the console application 'curl' to make an HTTP request and see the response body.
 - It is common to find multiple web services running on the same computing device.
 - Every network device allows for separate network connections by referring to a unique port number.
 - To resolve the issue of remembering a port number, a service gateway (reverse proxy) is introduced which is a simple web service that listens on the common HTTPS port 443. The gateway then looks at the request and maps it to other services running on different ports.
 - Web services that provide a single functional purpose are referred to as microservices.

<h5>Amazon Web Services - EC2</h5>

- How to remote shell into a server hosted on AWS:
  - ➜  ssh -i [key pair file] ubuntu@[ip address]
  - Example: ➜  ssh -i ~/keys/production.pem ubuntu@53.104.2.123
- The chmod (short for change mode) command is used to manage file system access permissions on Unix and Unix-like systems. 
- There are three basic file system permissions, or modes, to files and directories:
  -read (r), write (w), and execute (x).
- To restrict the permissions on your file so that they are not accessible to all uses run the 'chmod' command:
  - 'chmod  600 [key pair file]'
- The Caddyfile is the configuration file for your web service gateway.
- public_html directory contains all of the static files that you are serving up through Caddy when using it as a web service.
- Use the 'exit' command to exit a remote shell.
- Assigning an Elastic IP address to a server keeps the same address even if the server is stopped.
 
<h5>Domain Names</h5>
  
- A single domain name can be associated with multiple IP addresses so that in case one of them fails, another one can be used to maintain connection.
- Domain Name: a text string that follows a specific naming convention and is listed in the domain name registry.
- They are broken up into a root domain with one or more possible subdomain prefixes.
- Root Domain: represented by a secondary level domain and a top level domain (TLD).
  - Examples: byu.edu, google.com, or cs260.click.
- Top Level Domain (TLD): represent things like com, edu, or click.
- Domain Name Structure:
  - [subdomain.]*secondary.top; where secondary.top is the root domain.
  - Example: react.simon.cs260.click.
- The owner of a root domain can create any number of subdomains off the root domain.
- To get information about a domain name from the domain name registry, run the 'whois' command with the a website domain following that.
- DNS database records that facilitate the mapping of domain names to IPs come in a variety such as address (A) and canonical name (CNAME):
  - (A): a straight mapping from a domain name to an IP address.
  - (CNAME): maps one domain name to another domain name; this acts as a domain name alias.
    - You would use CNAME to do things like map byu.com to the same IP address as byu.edu so that either one could be used.

<h5>Amazon Web Services - Route 53</h5>

- Using a domain name in place of an IP address makes it easy to remember and secure.
- Route 53 is an AWS service that handles everything DNS related: buying domain names, hosting domain on their DNS servers, and creating DNS records.
- (NS) Name Server Record: contains names of the authoritative name servers that authorize you to place DNS records in this DNS server.
- (SOA) Start of Authority Record: provides contact information about the owner of this domain name.
  
<h5>Caddy</h5>

- Caddy is a webservice that listens for incoming HTTP requests:
  - Handles all of the creation and rotation of web certificates allowing support of HTTPS.
  - Serves up all of the static HTML, CSS and JS files.
  - Acts as a gateway for subdomain requests to application services such as the Simon or Startup project.
    - Example: when a request is made to simon.yourdomain Caddy will proxy the request to the Simon application running with node.js as an internal web service.

<h5>HTTPS, TLS, & Web Certificates</h5>

- With HTTP (non-secure hypertext transport protocol), the number of devices through which your connection goes through would leave any data or information passed along would be very exposed to being captured by anyone that has access to the network traffic.
- HTTPS (secure hypertext transport protocol) is basically HTTP with a negotiated secure connection that happens before any data is exchanged.
- The secure connection ensures that all data is encrypted using TLS protocol.
- TLS is sometimes referred to by the now unsecure predecessor protocol named SSL.
- It works by negotiating a shared secret that is then used to encrypt data.
- The actual negotiation can be seen by using the console browser based application 'curl' in combination with '-v': 'curl -v -s [domainName] /dev/null'.
- That last piece throws away the actual HTTP response.
- A core piece of the handshake is the exchange of a web certificate that identifies the domain name of the server creating the secure connection.
- The browser will compare the certificate domain name to the one represented in the URL and if they don't match, or the certificate is invalid or out of date, it will display a massive warning.
- Web Certificates: a digital file containing information that indicates the security and identity of a website using an encrypted connection.
- They are generated by a trusted 3rd party using public/private key encryption.
- The certificate issuer is responsible for verifying that the certificate owner actually own sthe domain name represented by the certificate.
- Using the IETF standard ACME protocol, anyone who owns a domain name, can dynamically generate and renew a certificate for free.
- Caddy uses Let's Encrypt to generate a web certificate every time an HTTPs request is made for a domain name that Caddy doesn't have a web certificate for.
- A web certificate ensures that user data is secure when transferred, verifies website ownership, & prevents attackers from creating fake versions of the site.
- 'sudo vi [file]': allows a permitted user to execute a command as the superuser or another user, as specified in the sudoers file.
- To save the file and exit VI(text editor), type :wq and hit enter.
- Restart Caddy: 'sudo service caddy restart'.

<h4>HTML and CSS</h4>

<h5>Hypertext Markup Language</h5>

- The html element represents the top level page structure.
- The head element contains metadata about the page and the page title.
- The body element represents the content structure.
- The main element represents the main content structure, as opposed to things like headers, footers, asides, and navigation content.
-  Attributes describe the specific details of the element.
  - For example, the id attribute gives a unique ID to the element so that you can distinguish it from other elements.
  - The class attribute is another common element attribute that designates the element as being classified into a named group of elements.
- Attributes are written inside the element tag with a name followed by an optional value. 
- You can use either single quotes (') or double quotes (") to delimit attribute values.
- A hyperlink is represented with an anchor (a) element that has an attribute containing the address of the hyperlink reference (href).
  - Example: <a href="https://byu[.]edu">Go to the Y</a>
- HTML defines a header (<!DOCTYPE html>) that tells the browser the type and version of the document.
- Common Elements:
  - html:	The page container
  - head:	Header information
  - title:	Title of the page
  - meta:	Metadata for the page such as character set or viewport settings
  - script:	JavaScript reference. Either a external reference, or inline
  - include:	External content reference
  - body:	The entire content body of the page
  - header:	Header of the main content
  - footer:	Footer of the main content
  - nav:	Navigational inputs
  - main:	Main content of the page
  - section:	A section of the main content
  - aside:	Aside content from the main content
  - div:	A block division of content
  - span:	An inline span of content
  - h<1-9>:	Text heading. From h1, the highest level, down to h9, the lowest level
  - p:	A paragraph of text
  - b:	Bring attention
  - table:	Table
  - tr:	Table row
  - th:	Table header
  - td:	Table data
  - ol,ul:	Ordered or unordered list
  - li:	List item
  - a:	Anchor the text to a hyperlink
  - img:	Graphical image reference
  - dialog:	Interactive component such as a confirmation
  - form:	A collection of user input
  - input:	User input field
  - audio:	Audio content
  - video:	Video content
  - svg:	Scalable vector graphic content
  - iframe:	Inline frame of another HTML page
- Comments for HTML files are created by the placing the comment inbetween '<!-- -->'.
- Special Characters:
  - &	&amp;
  - <	&lt;
  - >	&gt;
  - "	&quot;
  - '	&apos;
  - 😀 &#128512;
- By default a web server will display the HTML file named index.html when a web browser, such as Google Chrome, makes a request without asking for a specific HTML file.

   
   
   
