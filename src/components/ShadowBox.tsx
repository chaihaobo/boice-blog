import {FC, useEffect, useRef} from "react";


export interface ShadowBoxProps {
    htmlContent: string;
}

const ShadowBox: FC<ShadowBoxProps> = ({htmlContent}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!containerRef.current) {
            return
        }
        if (containerRef.current.shadowRoot && containerRef.current.shadowRoot!.mode == "open") {
            return;
        }
        const shadowRoot = containerRef.current!.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
      ${htmlContent}
    `;
    }, [htmlContent]);
    return (
        <>
            <div ref={containerRef}></div>
        </>
    )
}

export default ShadowBox;