import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useCallback, useRef, useState } from 'react';

export default function Playground() {
    const {siteConfig} = useDocusaurusContext();
    const outputEndRef = useRef(null);
    const [bpftraceCode, setBpftraceCode] = useState("begin { print(\"Hello World!\"); }");
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [exitMessage, setExitMessage] = useState("");

    const handleChange = useCallback((event) => {
        const pastedText = event.target.value;
        setBpftraceCode(pastedText);
    }, []);

    const handleClearClick = useCallback(() => {
        setBpftraceCode("");
    }, []);

    const handleRunClick = useCallback(() => {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const socket = new WebSocket(`${wsProtocol}//bpftrace-playground.fly.dev/execute`);

        setOutput([]);
        setIsRunning(true);

        socket.onopen = () => {
            const request = {
                version: "master",
                workload: "",
                code: bpftraceCode,
                files: {},
                timeout: 60000,
                testMode: "",
            };
            socket.send(JSON.stringify(request));
        };

        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            let message = response.data;
            if (response.type === 'exit') {
                const exitData = JSON.parse(message);
                if (exitData.exit_code === 0) {
                    setExitMessage("Execution finished successfully.");
                } else {
                    setExitMessage(`Execution finished. (${exitData.msg})`);
                }
                socket.close();
                setIsRunning(false);
            } else {
                // Remove our terminal colors
                message = message.replace("\u001b[31m", "");
                message = message.replace("\u001b[0m", "");
                setOutput(currentOutput => {
                    return [...currentOutput, ...message.split('\n')];
                });
            }
            outputEndRef.current?.scrollIntoView({ behavior: 'smooth', container: 'nearest' });
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            setExitMessage("WebSocket error. See console for details.");
            setIsRunning(false);
            socket.close();
        };
    }, [bpftraceCode]);

    let runButtonClassList = ["button", "button--primary", "margin-right--sm"];
    if (isRunning) {
        runButtonClassList.push("running");
    }

    return (
    <div className="row row--no-gutters">
        <div className="col col--10">
            <textarea
                className="playground-code-area"
                value={bpftraceCode}
                onChange={handleChange}
                />
            <div className="margin-bottom--sm">
                <button onClick={handleRunClick} id="playground-run" className={runButtonClassList.join(" ")} disabled={isRunning}>{isRunning ? "Running..." : "RUN"}</button>
                <button onClick={handleClearClick} className="button button--secondary margin-right--sm">CLEAR</button>
                <div className="playground-exit-message">{exitMessage}</div>
            </div>
            <div className="playground-output">
                {output.map((x, idx) => (<div className="playground-output-line" key={`line-${idx}`}>{x}</div>)) }
                <div ref={outputEndRef} />
            </div>
        </div>
    </div>
    );
}
