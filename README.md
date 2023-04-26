# Overview

The food app with a multitenant architecture is designed to cater to multiple brands and their outlets with a single login page. The app allows superadmins to create and manage multiple brands within the platform. Brands, in turn, can create products across multiple categories, subcategories, and outlets. Outlets have the option to create outlet agents who can place orders on behalf of customers, providing both dine-in and take-away options.

1. The app's multitenant architecture allows for secure and scalable management of multiple brands, outlets, and agents within a single platform. This design ensures that each brand has its own dedicated space within the app, with access to its specific products and outlet information.

2. The superadmin has the highest level of access and can manage all the brands, outlets, and agents within the app. This centralized management helps to streamline operations and improve efficiency. The app's single login page simplifies the login process for both admins and customers, eliminating the need for multiple logins.

3. The app's product management system allows brands to create and manage their products easily. They can categorize products into supercategories and subcategories, making it easier for customers to find what they are looking for. Outlets can also create and manage their agents within the platform, providing customers with a seamless ordering experience.

4. The app offers both dine-in and take-away options, providing customers with flexibility in how they want to enjoy their food. This feature also helps to improve customer satisfaction by providing them with a range of options.

Overall, the food app with a multitenant architecture provides a robust and scalable platform for managing multiple brands, outlets, and agents within a single platform. Its centralized management system, easy product management, and flexible ordering options make it an ideal solution for businesses looking to expand their food delivery services.

# Multitenant Architecture
![MultitenantArchitecture](https://user-images.githubusercontent.com/67423768/234512236-0f4de536-48a2-4cd4-bc8b-123275970700.png)

# Tech Stack
1. Backend - NodeJS, ExpressJs
2. Database - MongoDB
3. Fronted - AngularJS
4. Services - AWS S3, SocketIo, Nodemailer, passportJS

# Login Page
![Screenshot 2023-04-05 183050](https://user-images.githubusercontent.com/67423768/234512862-6d7463ef-523e-4c92-9cb0-52f2c754da8f.png)

# Super Admin View

SuperAdmin Dashboard where he can view brands growth and their outlets in graph form and some other analysis too. 

![analysisSuperAdmin](https://user-images.githubusercontent.com/67423768/234513835-cff5237e-c013-4b4a-ad19-cdd89e7c06db.png)

# Super Admin Home Page

Here he can register new brand and can add brand admin.

![SuperAdminHome](https://user-images.githubusercontent.com/67423768/234514248-183c1dba-6daf-4f10-8287-6415cf37a583.png)

# Super Admin Users View

Here all the users are visible and we can filter users on the basis of its role and name , number, email,etc

![SuperAdminUsers](https://user-images.githubusercontent.com/67423768/234514293-1a8741ca-9053-459a-9d6c-1bc3d4345581.png)

# Brand Admin View

![brandAdminAnalysis](https://user-images.githubusercontent.com/67423768/234515284-db3e8f92-5f7c-4e2b-b20c-e6f9af4c92bc.png)

# Brand Admin Home

![brandAdminOutlets](https://user-images.githubusercontent.com/67423768/234515395-f7465ba7-d408-45a4-8b94-6ac400677be6.png)

# Brand Admin SuperCategory

![brandAdminSuperCategory](https://user-images.githubusercontent.com/67423768/234515494-82b695a1-4bbc-42bd-b098-8ec57325cbfe.png)

# Outlet Admin View

![OutletAdminAnalysis](https://user-images.githubusercontent.com/67423768/234515611-cb102e25-111b-4e6c-99e2-a082637d517e.png)

# Outlet Admin Brand Products

![outletBrandProducts](https://user-images.githubusercontent.com/67423768/234515800-350bafa6-3a47-49c7-a34f-c75650a95a50.png)

# Outlet Products

![OutletProducts](https://user-images.githubusercontent.com/67423768/234515904-71c65fd6-26f1-4a16-85bd-daf97e0338bc.png)

# Outlet Setting

![OutletSetting](https://user-images.githubusercontent.com/67423768/234516003-0c8dd302-f4d4-4b60-af59-b1ee6e5ce7e3.png)




# Conceptual Framework

Backend

1. Server side pagination - Server-side pagination refers to the practice of breaking down a large set of data into smaller chunks that can be loaded and displayed on a web page incrementally, rather than all at once. This approach offers several benefits such as Improved performance, Reduced server load, More efficient memory usage, Easier maintenance.

2. PassportJS - PassportJS is a popular authentication middleware for Node.js. It provides a simple, modular and flexible way to add authentication to web applications and APIs.

3. AWS S3 - Amazon S3 (Simple Storage Service) is a cloud-based object storage service provided by Amazon Web Services (AWS). It is designed to store and retrieve any amount of data from anywhere on the web. Application's photos and files are stores on aws s3 bucket.

4. MongoDb Transactions - MongoDB transactions allow you to perform multiple operations as a single logical unit of work, ensuring that either all of the operations are applied, or none of them are. Update operations and many other queries are written using MongoDB Transactions.

5. Update - Bulk update refers to the process of updating multiple documents at once in a database, rather than updating them one by one. This can be done to optimize performance and reduce the amount of time it takes to update a large number of documents. bulkWrite() is being used for bulk updates.

6. Aggregations - Aggregations in MongoDB are a way to process data and return computed results based on some criteria. They allow you to perform advanced analytics and data processing on large datasets. Aggregations has been used for in-depth statistics which helps brand owners to optimize their company's processes.

Frontend

1. Auth Interceptor - An auth interceptor is a piece of middleware that intercepts HTTP requests and adds authentication information to them. It is used in support app to ensure that only authenticated users can access protected resources.

2. Debouncing - Debouncing is a technique used in web development to optimize search functionality and improve user experience. It involves delaying the execution of a search query until the user has finished typing, rather than triggering a search query for every keystroke. Deboucning is used in every search feild in support App.

3. Modularization - Code is divided into smaller, independent, and interchangeable modules or components.Each module performs a specific set of functions or tasks and can be developed, tested, and maintained independently.Modularization is used to improve the scalability, flexibility, maintainability, and reusability of the software.
