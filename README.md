# startup
CS 260 - Startup Project Repository

I am editing this file as it is one of the steps in the Github assignment for CS 260.

Now I am adding something here so that I can commit the change and then fetch it from VS Code.

<<<<<<< HEAD
Why did the blond fall out of the tree? She was raking leaves!
=======
Making a second change to this readme file.
>>>>>>> ef6d3b2e20c250942dbc696d190569183d0adcf4
  
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
