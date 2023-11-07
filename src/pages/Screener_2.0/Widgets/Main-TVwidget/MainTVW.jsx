import style from './mainTVW.module.sass'
import React, {useEffect, useRef} from "react"
import { useThemeParams } from '@vkruglikov/react-telegram-web-app'

let tvScriptLoadingPromise;
export default function MainTVW() {
    const [colorScheme, themeParams] = useThemeParams() //тг тема
    const themeColor = ({
        bg_color: themeParams.bg_color,
        button_color: themeParams.button_color,
        button_text_color: themeParams.button_text_color,
        hint_color: themeParams.hint_color,
        link_color: themeParams.link_color,
        secondary_bg_color: themeParams.secondary_bg_color,
        text_color: themeParams.text_color,
    });

    const onLoadScriptRef = useRef();
    useEffect(
        () => {
            onLoadScriptRef.current = createWidget;

            if (!tvScriptLoadingPromise) {
                tvScriptLoadingPromise = new Promise((resolve) => {
                    const script = document.createElement('script');
                    script.id = 'tradingview-widget-loading-script';
                    script.src = 'https://s3.tradingview.com/tv.js';
                    script.type = 'text/javascript';
                    script.onload = resolve;
                    document.head.appendChild(script);
                });
            }
            tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());
            return () => onLoadScriptRef.current = null;

            function createWidget() {
                if (document.getElementById('tradingview_a741a') && 'TradingView' in window) {
                    new window.TradingView.widget({
                        library_path: "https://charting-library.tradingview-widget.com/charting_library/",
                        width: "100%",
                        height: "300",
                        symbol: "BTCUSDT",
                        interval: "30",
                        timezone: "Etc/UTC",
                        theme: `${colorScheme}`,
                        style: "1",
                        locale: "ru",
                        enable_publishing: false,
                        backgroundColor: `${themeColor.bg_color}`,
                        hide_legend: true,
                        allow_symbol_change: true,
                        save_image: false,
                        studies: [
                            "Volume@tv-basicstudies",
                            "STD;Supertrend"
                        ],
                        container_id: "tradingview_a741a"
                    });
                }
            }
        },
        []
    );

    return (
        <div className={style.tradingview_widget_container}>
            <div id='tradingview_a741a'/>
        </div>
    )
}