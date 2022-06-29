"use strict";

// AFRAME.registerComponent('trigger', {

//     init: function () {
//         console.log("trigger component initialized")
//         this.collisionstartHandlerFn = function () {
//             // console.log("collisionstart!");
//         };
//         this.collisionendHandlerFn = function () {
//             // console.log("collisionend!");
//         };
//         this.el.addEventListener("collisionstart", this.collisionstartHandlerFn);
//         this.el.addEventListener("collisionend", this.collisionendHandlerFn);
//     },


//     // remove: function () {
//     //     var data = this.data;
//     //     var el = this.el;

//     //     // Remove event listener.
//     //     if (data.event) {
//     //         el.removeEventListener("collisionstart", this.collisionstartHandlerFn);
//     //         el.removeEventListener("collisionend", this.collisionendHandlerFn);
//     //     }
//     // }
// });




AFRAME.registerComponent('triggercam', {
    init: function () {
        this.isCollided = false;
        this.isCollidedOld = false;
        this.isColliding = false;

        console.log("triggercam component initialized.");

    },
    collisionCheck: function (o) {
        var thisMesh = this.el.object3D;

        // via https://github.com/aframevr/aframe/blob/master/docs/introduction/developing-with-threejs.md
        var vec1 = new THREE.Vector3();
        var opos = o.object3D.getWorldPosition(vec1);
        var vec2 = new THREE.Vector3();
        var tpos = this.el.object3D.getWorldPosition(vec2);

        var tx = Math.abs(opos.x - tpos.x) < o.getAttribute('geometry').width / 2;
        var ty = Math.abs(opos.y - tpos.y) < o.getAttribute('geometry').height / 2;
        var tz = Math.abs(opos.z - tpos.z) < o.getAttribute('geometry').depth / 2;

        // console.log(this.isColliding, tx, Math.abs(opos.x - tpos.x))

        // if (tx && ty && tz) {
        if (tx && tz) {
            // console.log(ty)
            this.isCollided = o.id;
            this.isColliding = true;
        }
        else {
            this.isCollided = false;
        }

    },
    tick: function (time, timeDelta) {
        var divs = document.querySelectorAll('.triggerable');
        // console.log(timeDelta);

        this.isColliding = false;

        // foreach doesn't work, see here:
        // https://css-tricks.com/snippets/javascript/loop-queryselectorall-matches/
        // [...document.querySelectorAll('.collidable')].forEach(this.collisionCheck);
        for (let i = 0; i < divs.length; ++i) {
            this.collisionCheck(divs[i]);
            if (this.isColliding == true) { break; }
        }

        if ((this.isCollided != this.isCollidedOld)) {
            // console.log("trigger.js: " + this.isCollided);

            if (this.isCollided) {
                console.log("in!", this.isCollided);

                document.querySelector("#" + this.isCollided).emit('collisionstart');
            }
            else {
                console.log("out!");
                document.querySelector("#" + this.isCollidedOld).emit('collisionend');
            }

            this.isCollidedOld = this.isCollided;
        }
    }
});