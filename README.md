
# links 2 go
Is going to be an awesome web app that can make a custom styled link list for social media

- Open source
- Can be Self Hosted
- Will have a free public available hosted app
- Will use third-party sevices to simplify the develpment

![mock](./public/mock1.jpg)

# Initial Ideas
The purpose of this project is to build something lik a SAAS from scratch, open to the community - for anyone that can learn from it and for experienced people likely to help.

The idea is to create something focused of whats is really important on the process of building a web project trying to not shine so much light on the things that matters the less.

I'm bulding it for me to learn in the process, and maybe inspire or help people that are not in the level of meking this kind of project by themselves. Yes it,s possible.

# Some interesting notes
There is something curious about this app: Every user will have how many styled pages they want. I'm not holding any user data with this project.

The app works like a page generator that recieves compressed data and do his magick.

There are tho bodies of data that could increase the complexity of this app.

- **Custom Images**

They are easy to store, but are very large in size. Cloud storage is not cheap.
The solution for this problem is allowing ony imageURLs, aka already hosted images. The app will suggest a thirdy-party free image host for a nice user experience.

- **Custom Settings**

The hard party here is handling users, this can be a huge pain when making a software. Handling user is a huge piece of infra structure involving holding users in a secure way on a database and a API server running to handle logins, logouts, sign tokens, etc. Not Cheap, huge code to maintain. (We need to know how to do all these VERY IMPORTANT things in professional products, but its not the point of this project.)

Despite being complex, user settings data tend to be lightweight and in this case its going to be just a page data.

**Inspiration**

Taking advantage fo its little size I've came to an not so new idea, stolen from old console games like Sega Genesis, aka Megadrive. The password concept.

In games like Super Hang On, you would recieve a long Hexa Decimal code that represents the compressed data of your game progress.
![password](./public/password-example.jpg)\
Eliminating the need for MemoryCards. Of course you would need to save a paper with the long password written ont it. It was kinda cool in that times.
![password-screen](./public/password-screen.jpg)\
To recover your progress you would write the password in and voila, your progess is back were you stoped.

**The Solution**
I can compress lots of urls, titles and CSS data, encoding them using an even higher base them the 16 bits of the Super hangon in the modern world.

I could play with the entire ASCII char spectrum that is 127 as the base. But actually i would need to remove unprintable, unsafe and reseved characters from the list, like listed in [here](https://support.exactonline.com/community/s/knowledge-base#All-All-DNO-Content-urlcharacters), resulting in 75 as the base. It still can holds lots of data!

Well, lots of hours have passed and I've realized that the base is not the main thing that can be used to compress data, at least in this scenario.

Studied a lot about text encoding but ended up with a simpler solution (maybe).

**GZip Compression**
GZip compression is the good old fashion way of compressing data. And would fit better in this scenario with different types of data, that I can control only a part of it.

Luckly there is a old NPM package that can do this in javascript. It was not easy to use it at first, leading me to abort it. But while studying and working with chars and text encoding my mind clicked up and I found a way to do it.

1 - It will take tha data and encode it to a JSON string.
2 - The JSON string is encoded to a GZip bytes array.
3 - The








