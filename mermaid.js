// Initialize mermaid with module
import mermaid from 'https://esm.sh/mermaid@10.4.0';
mermaid.initialize({ startOnLoad: true, theme: 'neutral', flowchart: { useMaxWidth: true } });
window.mermaidModule = mermaid;

// Mermaid stage control: highlight corresponding nodes by mapping stage -> mermaid node ids
const stageMap = {
  1: ['A'], // User Calls Contract
  2: ['B', 'C'], // Entry Point / Fallback, Read Storage
  3: ['D', 'E'], // Checks / Auth, State Update (SSTORE)
  4: ['G'], // External CALL
  5: ['H', 'F'] // Emit Event / Return, Revert / Return
};

function clearActiveNodes() {
  const svg = document.querySelector('.mermaid svg');
  if (!svg) return;
  const nodes = svg.querySelectorAll('.node');
  nodes.forEach(n => n.classList.remove('active'));
  // update stage chips
  document.querySelectorAll('.stage').forEach(s => s.classList.remove('active'));
}

function highlightStage(n) {
  clearActiveNodes();
  const svg = document.querySelector('.mermaid svg');
  if (!svg) return;
  // mermaid assigns internal ids that start with 'A', 'B' etc based on node labels above.
  // We'll attempt to find nodes by their text content match as a fallback.
  const targets = stageMap[n] || [];
  targets.forEach(t => {
    // try id-based
    let el = svg.querySelector(`#${CSS.escape(t)}`);
    if (!el) {
      // fallback: find node whose text contains mapping label
      const nodes = svg.querySelectorAll('.node');
      nodes.forEach(node => {
        if (node.textContent && node.textContent.toLowerCase().includes({
          'A': 'user',
          'B': 'entry',
          'C': 'read storage',
          'D': 'checks',
          'E': 'state update',
          'F': 'revert',
          'G': 'external call',
          'H': 'return'
        }[t].toLowerCase())) {
          node.classList.add('active');
        }
      });
    } else {
      // if id exists, add class to the node element (or closest .node)
      const nodeEl = el.closest('.node') || el;
      if (nodeEl) nodeEl.classList.add('active');
    }
  });
  const stageChip = document.getElementById('stage-' + n);
  if (stageChip) stageChip.classList.add('active');
}

// Hook up buttons in control column
function initMermaidControls() {
  document.querySelectorAll('.mermaid-controls .small').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const s = parseInt(e.currentTarget.getAttribute('data-stage'), 10);
      highlightStage(s);
    });
  });
}

// Ensure mermaid is re-rendered after page load when module available
window.addEventListener('load', () => {
  setTimeout(() => {
    if (window.mermaidModule && window.mermaidModule.init) {
      // re-render mermaid block (safe no-op)
      try { window.mermaidModule.init(undefined, document.querySelectorAll('.mermaid')); } catch (e) { console.warn(e); }
    }
  }, 300);
});

// Initialize controls when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMermaidControls);
} else {
  initMermaidControls();
}
