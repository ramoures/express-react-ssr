export const Colors = (color) => {
    try {
        let bgColor;
        let viaColor;
        switch (color) {
            case 'neutral':
                bgColor = 'bg-neutral-100';
                viaColor = 'via-neutral-100';
                break;
            case 'sky':
                bgColor = 'bg-sky-100';
                viaColor = 'via-sky-100';
                break;
            case 'green':
                bgColor = 'bg-green-100';
                viaColor = 'via-green-100';
                break;
            case 'pink':
                bgColor = 'bg-pink-100';
                viaColor = 'via-pink-100';
                break;
            case 'fuchsia':
                bgColor = 'bg-fuchsia-100';
                viaColor = 'via-fuchsia-100';
                break;
            case 'gold':
                bgColor = 'bg-amber-100';
                viaColor = 'via-amber-100';
                break;
            case 'rose':
                bgColor = 'bg-rose-100';
                viaColor = 'via-rose-100';
                break;
        }
        return [bgColor, viaColor]
    } catch (err) {
        return ''
    }
}