var db = firebase
  .initializeApp({
    databaseURL: "https://vue-firebase-eb81d.firebaseio.com"
  })
  .database();
var postsRef = db.ref("posts");

new Vue({
  el: "#app",
  data: {
    newPostTitle: "",
    newPostBody: "",
    newPostTimestamp: ""
  },
  firebase: {
    posts: postsRef.limitToLast(25)
  },
  methods: {
    addPost: function() {
      if (this.newPostTitle) {
        postsRef.push({
          title: this.newPostTitle,
          body: this.newPostBody,
          timestamp: this.timestamp()
        });
        this.newPostTitle = "";
        this.newPostBody = "";
        this.newPostTimestamp = "";
      }
    },
    updatePostText: function(post, newText) {
      postsRef
        .child(post[".key"])
        .child("text")
        .set(newText);
    },
    removePost: function(post) {
      postsRef.child(post[".key"]).remove();
    },
    timestamp: function() {
      var date = new Date();

      function formatDate(date) {
        var monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];

        var day = date.getDate(),
          monthIndex = date.getMonth(),
          year = date.getFullYear();

        return monthNames[monthIndex] + " " + day + ", " + year;
      }

      function formatTime(date) {
        var hour = date.getHours(),
          minute = date.getMinutes(),
          amPM = hour > 11 ? "pm" : "am";

        if (hour > 12) {
          hour -= 12;
        } else if (hour == 0) {
          hour = "12";
        }
        if (minute < 10) {
          minute = "0" + minute;
        }

        return hour + ":" + minute + amPM;
      }

      return formatTime(date) + " " + formatDate(date);
    }
  },
  computed: {
    // a computed getter
    sortedList: function() {
      // `this` points to the vm instance
      return this.items.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });
    }
  }
});
