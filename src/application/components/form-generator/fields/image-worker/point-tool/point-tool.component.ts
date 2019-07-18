import Vue from 'vue';
import Component from 'vue-class-component';
import {SCREEN_ACTIONS, SCREEN_MUTATIONS, ScreenTools} from '../../../../../../store/modules/screen';
import {Watch} from 'vue-property-decorator';

@Component({})
export default class PointToolComponent extends Vue {
    public canvas?: HTMLElement;
    public started: boolean = false;

    get activeTool(): ScreenTools {
        return this.$store.getters.getScreenActiveTool;
    }

    get screenHeight(): number {
        return this.$store.getters.getScreenHeight;
    }

    get screenWidth(): number {
        return this.$store.getters.getScreenWidth;
    }

    @Watch('activeTool') public updateListeners() {
        if (this.isActive()) {
            this.setListeners();
            return;
        }

        this.removeListeners();
    }

    public mounted() {
        const canvas = document.getElementById('bg-canvas');

        if (!canvas) {
            throw Error(`Can't find canvas or canvasWrap element`);
            return;
        }

        this.canvas = canvas;

        if (this.isActive()) {
            this.setListeners();
        }
    }

    public destroy() {
        this.removeListeners();
    }

    public setListeners() {
        if (!this.canvas) {
            return;
        }

        this.canvas.addEventListener('mousedown', this.mouseDown, false);
        this.canvas.addEventListener('mousemove', this.mouseMove, false);
        this.canvas.addEventListener('mouseup', this.mouseUp, false);
    }

    public removeListeners() {
        if (!this.canvas) {
            return;
        }

        this.canvas.removeEventListener('mousedown', this.mouseDown, false);
        this.canvas.removeEventListener('mousemove', this.mouseMove, false);
        this.canvas.removeEventListener('mouseup', this.mouseUp, false);
    }

    public isActive() {
        return this.activeTool === ScreenTools.pencil;
    }

    public changeTool() {
        this.$store.commit(SCREEN_MUTATIONS.setActiveTool, ScreenTools.pencil);
    }

    public mouseDown(event: MouseEvent) {
        this.$store.dispatch(SCREEN_ACTIONS.addPoint, this.getPoint(event)).then(() => {
            this.started = true;
        });
    }

    public mouseMove(event: MouseEvent) {
        if (!this.started) {
            return;
        }

        this.$store.dispatch(SCREEN_ACTIONS.addPoint, this.getPoint(event)).then(() => {
            this.started = true;
        });
    }

    public mouseUp(event: MouseEvent) {
        if (!this.started) {
            return;
        }

        this.$store.dispatch(SCREEN_ACTIONS.clearPoints).then(() => {
            this.started = false;
        });
    }

    public getPoint(event: MouseEvent) {
        if (!this.canvas) {
            return;
        }

        const height = this.canvas.clientHeight;
        const width = this.canvas.clientWidth;

        const coefX = width / this.screenWidth;
        const coefY = height / this.screenHeight;

        return {x: event.offsetX / coefX, y: event.offsetY / coefY};
    }
}

