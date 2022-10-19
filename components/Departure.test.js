import { render } from "@testing-library/react";
import { Departure } from "./Departure";

describe("Departure", () => {
    test("with nullable values", () => {
        const input = {
            when: null,
            delay: null,
            cancelled: true,
            direction: "Mocked Terminus",
            line: "42",
            tripId: "1234567890",
            plannedWhen: new Date(2020, 1, 1).getTime()
        }

        const wrapper = render(<Departure {...input} />);

        expect(wrapper).toMatchSnapshot();
    });

    test("delayed 2min", () => {
        const input = {
            when: new Date(2020, 1, 1).getTime(),
            delay: 120,
            cancelled: false,
            direction: "Mocked Terminus",
            line: "42",
            tripId: "1234567890",
            plannedWhen: new Date(2020, 1, 1).getTime()
        }

        const wrapper = render(<Departure {...input} />);

        expect(wrapper).toMatchSnapshot();
    });

    test("earlier 2min", () => {
        const input = {
            when: new Date(2020, 1, 1).getTime(),
            delay: -120,
            cancelled: false,
            direction: "Mocked Terminus",
            line: "42",
            tripId: "1234567890",
            plannedWhen: new Date(2020, 1, 1).getTime()
        }

        const wrapper = render(<Departure {...input} />);

        expect(wrapper).toMatchSnapshot();
    });

    test("on time", () => {
        const input = {
            when: new Date(2020, 1, 1).getTime(),
            delay: null,
            cancelled: false,
            direction: "Mocked Terminus",
            line: "42",
            tripId: "1234567890",
            plannedWhen: new Date(2020, 1, 1).getTime()
        }

        const wrapper = render(<Departure {...input} />);

        expect(wrapper).toMatchSnapshot();
    });
})