//Exporting Parameters Cards (display cards) and flash (animation of the cards when populate math.random()) 
//As a User, I know which cards to click to follow the Pattern.
export default function ColorCard({ cards, onClick, flash }) {
    return (
        <div
            onClick={onClick}
            //By default cards will have a specific styling, but when click, the flash styling should be display. 
            // If flash add this class, if not remove styling
            className={`card m-2 w-16 md:w-40 lg:w-44 bg-primary text-primary-content object-cover w-16 md:w-40 lg:w-44 rounded-xl colorCard ${cards} ${flash ? " flash m-2 w-16 md:w-40 lg:w-44 bg-neutral text-primary-content object-cover w-16 md:w-40 lg:w-44 rounded-xl colorCard " : ""}`}
        ></div>
    );
}