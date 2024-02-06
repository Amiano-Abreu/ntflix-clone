import styles from "./banner.module.css"

const Banner = ({title, subTitle, imgUrl}) => {

    const handleOnPlay = () => {
        console.log('play')
    }

    return (
        <div className={{
            ...styles.container
            }}
        >
            <div 
                style={{
                ...styles.leftWrapper}}
            >
                <div style={{...styles.left}}>
                    <h3 style={{...styles.title}}>
                        {title}
                    </h3>
                    <h3 style={{...styles.subTitle}}>
                        {subTitle}
                    </h3>

                    <div style={{...styles.playBtnWrapper}}>
                        <button 
                            className={{...styles.btnWithIcon}}
                            onClick={handleOnPlay}>Play</button>
                    </div>
                </div>
            </div>
            <div 
                className={styles.bannerImg}
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    width: '100%',
                    height: "100%",
                    position: 'absolute',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%'
                }}
            >
                
            </div>
        </div>
    );
}

export default Banner;