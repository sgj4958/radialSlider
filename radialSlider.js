const 원형슬라이더 = (querySelector, option) => {
    option = {
        color: "#000",
        size: 10,
        max: 360,
        value: 0,
        ...option
    }

    const parent = document.querySelector(querySelector)
    parent.innerHTML = `
    <style>
        @property --ghostRadial {
            syntax: '<number>';
            inherits: true;
            initial-value: 0; 
        }
        </style>
        <section style="
            --color: ${option.color};
            --dot-width: ${option.size}px;
            position: relative;
            width: 100%;
        ">
            <p style="
                position: absolute;
                inset: 0;
                display: flex;
                justify-content: center;
                align-items: start;
                margin: 0;
            ">
                <span style="
                    width: 50px;
                    height: 30px;
                    background: var(--color);
                    color: #fff;
                    opacity: .8;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    margin-top: -35px;
                    --ghostRadial: var(--radialSlider);
                    transition: --ghostRadial .3s ease-out;
                    transform: rotate( calc( ( var(--ghostRadial) - var(--radialSlider) ) * 1deg) );
                    transform-origin: calc(50% - 0px) 100%;
                ">0</span>
                <small style="
                    position: absolute;
                    width: 2px;
                    height: 5px;
                    top: 0;
                    background: var(--color);
                    left: 50%;
                    transform: translate(-50%, -100%);
                ">
                    <mark style="
                        position: absolute;
                        width: 4px;
                        aspect-ratio: 1;
                        border-radius: 100%;
                        background: var(--color);
                        top: 0;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    ">
                    </mark>
                </small>
            </p>
            <div style="
                border-radius: 100%;
                position: relative;
                background: conic-gradient(var(--color) calc(var(--radialSlider) * 1deg), transparent 0deg);
                mask: radial-gradient( closest-side, transparent calc( 100% - var(--dot-width) ), #000 calc( 100% - var(--dot-width) + 1px ) );
            ">
                <div style="
                    aspect-ratio: 1;
                    transform: rotate(calc(var(--radialSlider) * 1deg));
                    border: var(--dot-width) solid color-mix(in srgb, var(--color) 30%, transparent);
                    border-radius: 100%;
                ">
                    <div style="
                        position: absolute;
                        top: calc(var(--dot-width) * -1);
                        left: calc(50% - var(--dot-width) / 2);
                        width: var(--dot-width); 
                        aspect-ratio: 1;
                        border-radius: 100%;
                        background: var(--color);
                    "></div>
                </div>
                <div style="
                    position: absolute;
                    top: 0;
                    left: calc(50% - var(--dot-width) / 2);
                    width: var(--dot-width); 
                    aspect-ratio: 1;
                    border-radius: 100%;
                    background: var(--color);
                "></div>
            </div>
        </section>
    `

    let isDragging = false

    const getAngle = e => {
        const bcr = parent.getBoundingClientRect()
        const centerX = bcr.width / 2 + bcr.x
        const centerY = bcr.height / 2 + bcr.y
        return (Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI + 360 + 90) % 359
    }
    const setAngle = e => {
        const angle = typeof e === "number" ? e : Number(getAngle(e)).toFixed(0)
        parent.style.setProperty("--radialSlider", angle)
        parent.querySelector("span").textContent = (angle / 360 * option.max).toFixed(0)
        parent.querySelector("p").style.transform = `rotate(${angle}deg)`
    }

    setAngle(option.value / option.max * 360)

    parent.addEventListener("pointerdown", () => isDragging = true)
    document.addEventListener("pointermove", e => isDragging && setAngle(e))
    document.addEventListener("pointerup", e => isDragging && (isDragging = false || setAngle(e)))
}
