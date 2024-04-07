import telegramIcon from "../../../../assets/Tasks/telegram.svg";
import instagramIcon from "../../../../assets/Tasks/instagram.svg";
import youtubeIcon from "../../../../assets/Tasks/youtube.svg";

export function getPrefix(lowercaseText, t) {
    if (lowercaseText.includes('subscribe_to')) {
        return t('mining.components.taskList.prefix.subscribe');
    } else if (lowercaseText.includes('like_to')) {
        return t('mining.components.taskList.prefix.like');
    }
    return '';
}

export function getPostfix(lowercaseText, setIcon) {
    if (lowercaseText.includes('telegram')) {
        setIcon(telegramIcon);
        return 'Telegram';
    } else if (lowercaseText.includes('instagram')) {
        setIcon(instagramIcon);
        return 'Instagram';
    } else if (lowercaseText.includes('youtube')) {
        setIcon(youtubeIcon);
        return 'YouTube';
    }
    return '';
}
