export default function IframeBuilder({ src, title, allowFullScreen }) {
    const frameSrc = `https://fascinating-queijadas-53a09a.netlify.app/?image=` + src + `?not-from-cache-please`
    return (
        <iframe
            src={frameSrc}
            title={title}
            allowFullScreen={allowFullScreen}
        ></iframe>
    )
} 