create database mydb;
use mydb;

create table temp (
    idtemp int auto_increment,
    fname varchar(50), 
    lname varchar(50), 
    rollNo int, 
    email varchar(150), 
    password varchar(100) default null,
    imageUrl varchar(500), 
    role varchar(5), 
    primary key (idtemp),
    unique key unique_fields (email, rollNo)
);

create table posts (
    idposts int auto_increment,
    email varchar(100), 
    title varchar(20), 
    url varchar(100), 
    description varchar(1000), 
    file_name varchar(100) default null, 
    school varchar(10),
    stream varchar(10),
    date_time datetime,
    primary key(idposts)
);

create table saved (
    idsaved int auto_increment,
    email varchar(100),
    postId int,
    foreign key(postId) references posts(idposts)
    on update cascade on delete cascade,
    primary key (idsaved)
);

create table feedback (
    idfeedback int auto_increment,
    email varchar(100),
    feedback varchar(2000),
    primary key (idfeedback)
);