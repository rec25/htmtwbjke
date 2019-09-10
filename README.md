# Front-End

## HTML/CSS Coding
Code up a web design from PSD

- [~~Invision 1~~](https://projects.invisionapp.com/share/8U3I7GA73#/screens/88218568)
- [~~Invision 2~~](https://projects.invisionapp.com/share/8U3I7GA73#/screens/88232179)
- [PSD](https://www.dropbox.com/sh/g1zcrnmojrcx4gv/AAAR7cTO_9S6IUofwxu7Jhh0a?dl=0)

**Requirements:**

- ~~Pixel perfect coding~~
- IE11+
- Responsive (styles for mobile devices are to be determined by developer)

**Principles of development:**

- Semantic
- Progressive enhancement

**Required technologies:**

- SASS
- Gulp
- GIT

## Programming

It is necessary to implement the functionality

1. Listing of last 5 comments (check API description below)
2. Load more (+5) comments
3. Add new comment
4. Reply on comment
5. Edit own comments
6. Remove own comments

# API reference

### Get comments list

Request: `GET http://frontend-test.pingbull.com/pages/YOUR E-MAIL/comments`

Params:

- `count` - integer
- `offset` - integer

### Get single comment

Request: `GET http://frontend-test.pingbull.com/pages/YOUR E-MAIL/comments/COMMENT ID`

### New comment

Request: `POST http://frontend-test.pingbull.com/pages/YOUR E-MAIL/comments`

Params:

- `content` - text
- `parent` - ID of parent comment or NULL

### Edit comment

Request: `PUT http://frontend-test.pingbull.com/pages/YOUR E-MAIL/comments/COMMENT ID`

Params:

- `content` - text

### Delete comment

Request: `DELETE http://frontend-test.pingbull.com/pages/YOUR E-MAIL/comments/COMMENT ID`

\* If browser or framework doesn't support PUT/DELETE requests, then they can be emulated with POST request and additional parameter `_method: 'PUT'` / `_method: 'DELETE'`

Example:

```js
$.ajax({
    url: 'http://frontend-test.pingbull.com/pages/YOUR E-MAIL/comments/COMMENT ID',
    type: 'POST',
    dateType: 'json',
    data: {
        _method: 'DELETE'
    }
});
```