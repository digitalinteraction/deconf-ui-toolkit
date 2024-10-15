import { defineComponent } from 'vue';

// A component for filling in content

export const CONTENT_PARAGRAPHS = [
  `Is this my espresso machine? Wh-what is-h-how did you get my espresso machine? Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists. Hey, you know how I'm, like, always trying to save the planet? Here's my chance.`,
  `Hey, take a look at the earthlings. Goodbye! Do you have any idea how long it takes those cups to decompose. Hey, take a look at the earthlings. Goodbye! Yes, Yes, without the oops! Is this my espresso machine? Wh-what is-h-how did you get my espresso machine?`,
  `So you two dig up, dig up dinosaurs? So you two dig up, dig up dinosaurs? Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! Eventually, you do plan to have dinosaurs on your dinosaur tour, right? Must go faster. You really think you can fly that thing?`,
  `Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! Hey, take a look at the earthlings. Goodbye! Did he just throw my cat out of the window? Forget the fat lady! You're obsessed with the fat lady! Drive us out of here! Yeah, but John, if The Pirates of the Caribbean breaks down, the pirates don’t eat the tourists.`,
  `Must go faster. You're a very talented young man, with your own clever thoughts and ideas. Do you need a manager? Yeah, but your scientists were so preoccupied with whether or not they could, they didn't stop to think if they should. Remind me to thank John for a lovely weekend.`,
];

export const Content = defineComponent({
  props: {
    size: { type: Number, default: CONTENT_PARAGRAPHS.length },
  },
  computed: {
    paragraphs() {
      return Array.from(
        { length: this.size },
        (_, i) => CONTENT_PARAGRAPHS[i % CONTENT_PARAGRAPHS.length],
      ).sort(() => (Math.random() > 0.5 ? -1 : 1));
    },
  },
  template: `
    <div>
      <p v-for="p in paragraphs">{{ p }}</p>
    </div>
  `,
});
