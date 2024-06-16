var TPWidget;(() => {
    "use strict";
    var e = {
        d: (t, n) => {
            for (var o in n) e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, { enumerable: !0, get: n[o] })
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: e => {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" });
            Object.defineProperty(e, "__esModule", { value: !0 })
        }
    }, t = {};
    e.r(t), e.d(t, { create: () => n });

    async function n(e) {
        if (!e.event || !await async function (e) {
            return (await fetch(`https://api-widget.ticketpass.org/events/${e}`)).ok
        }(e.event)) return void console.error("[ERROR] Event ID cannot be empty or invalid");
        if (!e.elementId || !document.getElementById(e.elementId)) return void console.error("[ERROR] Element ID cannot be empty and must be present.");
        if (!e.mode || "modal" !== e.mode && "display" !== e.mode) return void console.error("[ERROR] Mode must be set to modal or display.");
        if ("modal" === e.mode && !e.buttonId) return void console.error("[ERROR] Button id element must be set.");

        const t = function (e) {
            let t = document.createElement("iframe");
            const n = "modal" === e.mode ? 1 : 0;
            return t.src = `https://widget.ticketpass.org/event/${e.event}/?modal=${n}`,
                "modal" === e.mode && (
                    t.setAttribute("allowtransparency", "true"),
                    t.setAttribute("allowfullscreen", "true"),
                    t.setAttribute("allow", "payment *"),
                    t.style.position = "fixed",
                    t.style.right = "0",
                    t.style.zIndex = 1e4
                ),
                t.style.bottom = "0",
                t.style.border = "0",
                t.style.width = "100%",
                t.style.height = "100%",
                t
        }(e);

        (function (e, t) {
            t.addEventListener("load", (() => {
                document.getElementById("tp-spinner").style.display = "none"
            })),
                "modal" === e.mode && (
                    window.addEventListener("message", (n => {
                        "close" === n.data.type && (
                            document.getElementById(e.elementId).removeChild(t),
                            e.onClose && e.onClose(n.data.params)
                        )
                    })),
                    document.getElementById(e.buttonId).addEventListener("click", (() => {
                        function e(e, t) {
                            document.getElementById("tp-spinner").style.display = "",
                                document.getElementById(e.elementId).appendChild(t)
                        }
                        (e, t)
                    }))
                )
        })(e, t),

            function () {
                const e = document.createElement("div"),
                    t = document.createElement("style");
                t.innerHTML = `
                    .loader {
                        position: fixed;
                        top: calc(50% - 50px);
                        left: calc(50% - 50px);
                        border: 16px solid #E8EAEF;
                        border-radius: 50%;
                        border-top: 16px solid transparent;
                        width: 100px;
                        height: 100px;
                        margin: 20px auto;
                        -webkit-animation: spin 2s linear infinite;
                        animation: spin 2s linear infinite;
                    }
                    @-webkit-keyframes spin {
                        0% { -webkit-transform: rotate(0deg); }
                        100% { -webkit-transform: rotate(360deg); }
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `,
                    document.body.appendChild(t),
                    e.classList.add("loader"),
                    e.id = "tp-spinner",
                    e.style.display = "none",
                    e.style.zIndex = "10000",
                    document.body.appendChild(e)
