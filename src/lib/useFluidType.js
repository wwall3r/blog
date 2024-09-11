const watchWidth = (element) => {
    if (typeof window.ResizeObserver !== "undefined") {
        const resizeObserver = new window.ResizeObserver((entries) => {
            window.requestAnimationFrame(() => {
                if (!Array.isArray(entries) || !entries.length) {
                    return;
                }
                for (const entry of entries) {
                    if (entry.contentRect) {
                        entry.target.style.setProperty(
                            "--tt-bind",
                            entry.contentRect.width,
                        );
                    }
                }
            });
        });
        resizeObserver.observe(element);

        return resizeObserver;
    }
};

/** @type {import('svelte/action').Action} */
export const fluidType = (node) => {
    const resizeObserver = watchWidth(node);
    return {
        destroy() {
            if (resizeObserver) {
                resizeObserver.disconnect();
            }
        },
    };
};
