const { useEffect } = require("react");

function Aboutpage(){
    useEffect(() => {
        AOS.init({
            duration:1000,
            once: false,
            mirror: true
        });
    }, []);

    return(
        <div className='font-sans'>
            <Header/>
            <section >
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h1>
                        </h1>
                        <p>                            
                        </p>
                    </div>
                </div>
            </section>

            <section >
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h1>
                        </h1>
                        <p>                            
                        </p>
                    </div>
                </div>
            </section>

            <section >
                <div>
                    <div>
                        <img src="" alt="" />
                    </div>
                    <div>
                        <h1>
                        </h1>
                        <p>                            
                        </p>
                    </div>
                </div>
            </section>
            <section>
                <div>
                    <img src="" alt="" />
                </div>
            </section>
            <Footer/>
        </div>
    );
}