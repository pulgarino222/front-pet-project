const { useEffect } = require("react");

function Aboutpage(){
    useEffect(() => {
        AOS.init({
            duration:1000,
            once: false,
            mirror: true
        });
    }, []);
}