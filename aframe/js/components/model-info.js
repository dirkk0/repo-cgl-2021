
AFRAME.registerComponent("model-info", {

    init: function () {
        let el = this.el;

        // After gltf model has loaded, modify it materials.
        el.addEventListener('model-loaded', function (ev) {
            console.log("model loaded:", this.id)
            // document.querySelector("body > div.intro1screen.fade-in > p:nth-child(2)").innerText += "."
            // if (this.id == "tunnel2") {
            // window.manager.sceneState = 10
            // }
            const model = el.getObject3D('mesh');
            model.traverse((node) => {
              if (node.isMesh) {
                console.log(node.name)
                if (node.name == "Sky") {
                    // node.remove();
                }
              }
            });
        });
    }
});