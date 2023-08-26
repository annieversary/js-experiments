function setupDag(cells) {
    let values = {};

    const change = (key, value) => {
        values[key] = value;

        for (const c of Object.keys(cells)) {
            if (c == key) continue;

            console.log(c, values[c]);
            if (cells[c] != null) {
                const old = values[c];
                values[c] = cells[c](values);

                // if (old != values[c]) {
                    const el = document.querySelector(`input[name="${c}"]`);
                    el.value = values[c];
                // }
            }
        }
    };

    for (const key of Object.keys(cells)) {
        const el = document.querySelector(`input[name="${key}"]`);
        values[key] = el.value;
        el.addEventListener('change', () => change(key, el.value));
    }

    for (const key of Object.keys(cells)) {
        change(key, values[key]);
    }
}
