import { useState } from "react";

const sections = [
  { id: "architecture", label: "🏗️ Architecture" },
  { id: "components", label: "🧱 4 Core Components" },
  { id: "activity", label: "📱 Activity" },
  { id: "fragment", label: "🧩 Fragment" },
  { id: "services", label: "⚙️ Services" },
  { id: "intents", label: "📨 Intents" },
  { id: "misc", label: "🔧 Misc Concepts" },
];

const Card = ({ title, children, color = "indigo" }) => {
  const colors = {
    indigo: "border-indigo-400 bg-indigo-950/40",
    green: "border-green-400 bg-green-950/40",
    yellow: "border-yellow-400 bg-yellow-950/40",
    red: "border-red-400 bg-red-950/40",
    blue: "border-blue-400 bg-blue-950/40",
    purple: "border-purple-400 bg-purple-950/40",
    orange: "border-orange-400 bg-orange-950/40",
  };
  const titleColors = {
    indigo: "text-indigo-300",
    green: "text-green-300",
    yellow: "text-yellow-300",
    red: "text-red-300",
    blue: "text-blue-300",
    purple: "text-purple-300",
    orange: "text-orange-300",
  };
  return (
    <div className={`rounded-xl border ${colors[color]} p-4 mb-4`}>
      {title && <h3 className={`font-bold text-sm mb-3 uppercase tracking-wider ${titleColors[color]}`}>{title}</h3>}
      {children}
    </div>
  );
};

const Badge = ({ text, color = "gray" }) => {
  const c = {
    gray: "bg-gray-700 text-gray-200",
    green: "bg-green-800 text-green-200",
    blue: "bg-blue-800 text-blue-200",
    red: "bg-red-800 text-red-200",
    yellow: "bg-yellow-800 text-yellow-200",
    purple: "bg-purple-800 text-purple-200",
    orange: "bg-orange-800 text-orange-200",
  };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c[color]}`}>{text}</span>;
};

const LifecycleFlow = ({ steps, colors }) => (
  <div className="flex flex-col items-center gap-1 my-2">
    {steps.map((s, i) => (
      <div key={i} className="flex flex-col items-center">
        <div className={`rounded-lg px-4 py-2 text-xs font-mono font-bold ${colors[i % colors.length]} text-white shadow`}>
          {s.name}
        </div>
        {s.note && <div className="text-xs text-gray-400 italic mt-0.5 mb-0.5 text-center max-w-xs">{s.note}</div>}
        {i < steps.length - 1 && <div className="text-gray-500 text-lg leading-none">↓</div>}
      </div>
    ))}
  </div>
);

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-700 text-gray-200">
          {headers.map((h, i) => <th key={i} className="px-3 py-2 text-left font-semibold">{h}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? "bg-gray-800/60" : "bg-gray-800/30"}>
            {row.map((cell, j) => <td key={j} className="px-3 py-2 text-gray-300">{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const sections_content = {
  architecture: () => (
    <div>
      <p className="text-gray-300 text-sm mb-4">Think of an Android app as a layered house. Each layer has a job.</p>

      <Card title="The App Stack — Top to Bottom" color="indigo">
        <div className="space-y-2">
          {[
            { layer: "Your App Code", desc: "Activities, Fragments, ViewModels", icon: "🏠", bg: "bg-indigo-800" },
            { layer: "Application Class", desc: "First thing created. Sets up global state.", icon: "🧬", bg: "bg-blue-800" },
            { layer: "Context", desc: "Your app's handle to the Android system (resources, prefs, DB access)", icon: "🔑", bg: "bg-cyan-800" },
            { layer: "Android Framework", desc: "Activity Manager, Content Providers, Notifications…", icon: "⚙️", bg: "bg-teal-800" },
            { layer: "Linux Kernel", desc: "Memory, processes, hardware drivers", icon: "🐧", bg: "bg-gray-700" },
          ].map((l, i) => (
            <div key={i} className={`${l.bg} rounded-lg px-4 py-2 flex items-center gap-3`}>
              <span className="text-lg">{l.icon}</span>
              <div>
                <div className="text-white font-semibold text-sm">{l.layer}</div>
                <div className="text-gray-300 text-xs">{l.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Context: Two Flavors" color="blue">
        <Table
          headers={["Type", "Tied To", "Use When"]}
          rows={[
            ["Application Context", "App lifecycle", "Passing context beyond an Activity (e.g. singletons)"],
            ["Activity Context", "Activity lifecycle", "UI operations, dialogs, views — anything tied to a screen"],
          ]}
        />
        <p className="text-yellow-300 text-xs mt-2">⚠️ Using Activity Context in a long-lived object = memory leak!</p>
      </Card>
    </div>
  ),

  components: () => (
    <div>
      <p className="text-gray-300 text-sm mb-4">Every Android app is assembled from exactly 4 building blocks.</p>
      <div className="grid grid-cols-1 gap-3">
        {[
          { icon: "📱", name: "Activity", color: "bg-indigo-700", desc: "A single screen with a UI. The user interacts with it directly.", analogy: "A page in a book" },
          { icon: "⚙️", name: "Service", color: "bg-green-700", desc: "Runs in the background with no UI. Music, downloads, sync.", analogy: "A worker in a back room" },
          { icon: "📡", name: "Broadcast Receiver", color: "bg-yellow-700", desc: "Listens for system-wide events (battery low, network change).", analogy: "A smoke detector" },
          { icon: "🗄️", name: "Content Provider", color: "bg-purple-700", desc: "Shares structured data between apps (e.g. Contacts).", analogy: "A shared database with a bouncer" },
        ].map((c, i) => (
          <div key={i} className={`${c.color} rounded-xl p-3 flex gap-4 items-start`}>
            <div className="text-3xl">{c.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-white">{c.name}</div>
              <div className="text-gray-200 text-xs mt-0.5">{c.desc}</div>
              <div className="text-gray-300 text-xs mt-1 italic">Analogy: {c.analogy}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),

  activity: () => (
    <div>
      <Card title="Activity Lifecycle — The Full Journey" color="indigo">
        <div className="flex gap-4">
          <div className="flex-1">
            <LifecycleFlow
              steps={[
                { name: "onCreate()", note: "Setup UI, get Bundle data. Runs once." },
                { name: "onStart()", note: "Activity is visible but not interactive" },
                { name: "onResume()", note: "🟢 User can interact now" },
                { name: "onPause()", note: "Losing focus (e.g. dialog appears)" },
                { name: "onStop()", note: "No longer visible" },
                { name: "onDestroy()", note: "Activity is being killed" },
              ]}
              colors={["bg-indigo-600", "bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-orange-600", "bg-red-700"]}
            />
          </div>
          <div className="w-px bg-gray-600" />
          <div className="flex-1 flex flex-col gap-2 justify-center text-xs text-gray-300">
            <div className="bg-gray-800 rounded p-2"><span className="text-green-400 font-bold">onRestart()</span> — called when coming back from stopped state</div>
            <div className="bg-gray-800 rounded p-2"><span className="text-yellow-400 font-bold">onSaveInstanceState()</span> — save data before pause</div>
            <div className="bg-gray-800 rounded p-2"><span className="text-blue-400 font-bold">onRestoreInstanceState()</span> — recover saved state on recreate</div>
            <div className="bg-red-900/50 rounded p-2 border border-red-500"><span className="text-red-300 font-bold">Screen Rotation</span> → onDestroy() then onCreate() again!</div>
          </div>
        </div>
      </Card>

      <Card title="Launch Modes — How Activities Stack" color="purple">
        <Table
          headers={["Mode", "Creates new?", "Back stack behavior", "Use case"]}
          rows={[
            ["standard", "Always", "Stacks on top every time", "Default — most activities"],
            ["singleTop", "Only if not on top", "Reuses top instance → onNewIntent()", "Search results, notifications"],
            ["singleTask", "Only if not in task", "Clears everything above it", "Main/home activity"],
            ["singleInstance", "Always in own task", "Completely isolated task", "Launcher, browser"],
          ]}
        />
      </Card>

      <Card title="Clearing the Back Stack" color="yellow">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800 rounded p-2">
            <div className="text-yellow-300 font-bold mb-1">FLAG_ACTIVITY_CLEAR_TOP</div>
            <div className="text-gray-300">Clears activities above the existing instance. That old instance becomes root.</div>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <div className="text-blue-300 font-bold mb-1">FLAG_ACTIVITY_CLEAR_TASK</div>
            <div className="text-gray-300">Clears the <em>entire</em> task. Use with FLAG_ACTIVITY_NEW_TASK.</div>
          </div>
        </div>
      </Card>
    </div>
  ),

  fragment: () => (
    <div>
      <Card title="Fragment vs Activity — The Key Difference" color="green">
        <Table
          headers={["", "Activity", "Fragment"]}
          rows={[
            ["Has own UI?", "✅ Yes", "✅ Yes (optional)"],
            ["Lives independently?", "✅ Yes", "❌ Must be hosted by Activity"],
            ["Lifecycle controlled by?", "Android system", "Host Activity"],
            ["Reusable across screens?", "❌ Not really", "✅ Designed for reuse"],
            ["Added/removed at runtime?", "❌ Complex", "✅ Yes, easily"],
          ]}
        />
      </Card>

      <Card title="Fragment Lifecycle" color="blue">
        <LifecycleFlow
          steps={[
            { name: "onAttach()", note: "Fragment connects to its Activity" },
            { name: "onCreate()", note: "Initialize non-UI components" },
            { name: "onCreateView()", note: "Inflate and return the layout" },
            { name: "onActivityCreated()", note: "Activity fully ready; safe to use findViewById()" },
            { name: "onStart()", note: "Fragment becomes visible" },
            { name: "onResume()", note: "🟢 Interactive" },
            { name: "onPause() → onStop()", note: "Losing visibility" },
            { name: "onDestroyView()", note: "View hierarchy destroyed" },
            { name: "onDestroy()", note: "Fragment cleanup" },
          ]}
          colors={["bg-teal-700", "bg-cyan-700", "bg-blue-600", "bg-indigo-600", "bg-blue-600", "bg-green-600", "bg-yellow-600", "bg-orange-600", "bg-red-700"]}
        />
      </Card>

      <Card title="add() vs replace() — Common Gotcha" color="orange">
        <Table
          headers={["", "add()", "replace()"]}
          rows={[
            ["Previous fragment", "Stays active (not paused)", "Destroyed"],
            ["Back press", "Previous fragment reappears (no onCreateView)", "Previous fragment recreated"],
            ["Lifecycle events fired?", "No (for existing fragment)", "Yes (onPause, onResume etc.)"],
            ["Use when", "Layering fragments (tabs)", "Swapping screens fully"],
          ]}
        />
        <div className="mt-2 text-xs text-yellow-300">💡 Retained Fragments survive screen rotation — they're not destroyed on config change.</div>
      </Card>
    </div>
  ),

  services: () => (
    <div>
      <Card title="3 Types of Services" color="green">
        <div className="space-y-2">
          {[
            { name: "Foreground Service", icon: "🔔", color: "bg-green-800", desc: "User-visible via persistent notification. High priority. Music, navigation.", ex: "Spotify playback" },
            { name: "Background Service", icon: "🌑", color: "bg-gray-700", desc: "Invisible. Restricted post Android 8.0 (Oreo). Use WorkManager instead.", ex: "Syncing data" },
            { name: "Bound Service", icon: "🔗", color: "bg-blue-800", desc: "Components bind to it and communicate via IBinder. Lives as long as clients exist.", ex: "Location updates feed" },
          ].map((s, i) => (
            <div key={i} className={`${s.color} rounded-lg p-3`}>
              <div className="flex items-center gap-2 mb-1">
                <span>{s.icon}</span>
                <span className="font-bold text-white text-sm">{s.name}</span>
                <span className="text-gray-300 text-xs italic ml-auto">{s.ex}</span>
              </div>
              <div className="text-gray-300 text-xs">{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Service Variants — Comparison" color="blue">
        <Table
          headers={["", "Service", "IntentService", "JobIntentService"]}
          rows={[
            ["Thread", "Main (UI) thread ⚠️", "Worker thread ✅", "Worker thread ✅"],
            ["Handles multiple tasks?", "Yes, manually", "No, sequential queue", "No, sequential queue"],
            ["Stops itself?", "No", "Yes, when done", "Yes, when done"],
            ["Survives Oreo+ restrictions?", "Partly", "No", "Yes (uses JobScheduler)"],
            ["Best for", "Long-running bg work", "Short, discrete tasks", "Guaranteed deferred tasks"],
          ]}
        />
      </Card>

      <Card title="Service Lifecycle" color="purple">
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
          {[
            { m: "onCreate()", d: "Service created, init resources" },
            { m: "onStartCommand()", d: "Client calls startService(). Main work happens here." },
            { m: "onBind()", d: "Client calls bindService(). Returns IBinder." },
            { m: "onUnbind()", d: "All clients disconnected" },
            { m: "onDestroy()", d: "Service shutting down, release resources" },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 rounded p-2">
              <div className="text-purple-300 font-mono font-bold">{item.m}</div>
              <div className="mt-0.5">{item.d}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  ),

  intents: () => (
    <div>
      <Card title="Intent = Message Passing System" color="indigo">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-indigo-900 rounded-lg p-3 text-xs">
            <div className="text-indigo-300 font-bold mb-1">Explicit Intent</div>
            <div className="text-gray-300">You name the exact component to launch.</div>
            <div className="text-gray-400 mt-1 font-mono">Intent(this, TargetActivity::class.java)</div>
            <div className="text-gray-400 mt-1 italic">Within your own app</div>
          </div>
          <div className="bg-blue-900 rounded-lg p-3 text-xs">
            <div className="text-blue-300 font-bold mb-1">Implicit Intent</div>
            <div className="text-gray-300">Declare an action; system finds the right app.</div>
            <div className="text-gray-400 mt-1 font-mono">ACTION_SEND, ACTION_VIEW…</div>
            <div className="text-gray-400 mt-1 italic">Open browser, send email, dial number</div>
          </div>
        </div>
        <Table
          headers={["Intent Type", "What it is", "Use case"]}
          rows={[
            ["Regular", "Fires and forgets", "Start activity, launch service"],
            ["Sticky", "Stays in system after broadcast", "Legacy — avoid in modern dev"],
            ["Pending", "Deferred, executed by another app/system", "Notifications, alarms, geofences"],
          ]}
        />
      </Card>

      <Card title="Intent Anatomy" color="blue">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { part: "Action", desc: 'What to do — e.g. ACTION_VIEW, ACTION_SEND', color: "text-blue-300" },
            { part: "Data (URI)", desc: "What to act on — e.g. a URL or phone number", color: "text-green-300" },
            { part: "Category", desc: "Additional context — e.g. CATEGORY_LAUNCHER", color: "text-yellow-300" },
            { part: "Extras (Bundle)", desc: "Key-value data passed along", color: "text-purple-300" },
            { part: "Component", desc: "Explicit target class (explicit intents)", color: "text-red-300" },
            { part: "Flags", desc: "Modify behavior — e.g. CLEAR_TOP, NEW_TASK", color: "text-orange-300" },
          ].map((item, i) => (
            <div key={i} className="bg-gray-800 rounded p-2">
              <div className={`${item.color} font-bold`}>{item.part}</div>
              <div className="text-gray-400 mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Intent Filters (in AndroidManifest)" color="green">
        <p className="text-xs text-gray-300 mb-2">Tells the system: "this component can handle <em>this kind</em> of intent." Declared in AndroidManifest.xml.</p>
        <div className="bg-gray-900 rounded p-3 font-mono text-xs text-green-300">
          {"<intent-filter>"}<br/>
          {"  <action android:name=\"android.intent.action.VIEW\" />"}<br/>
          {"  <category android:name=\"android.intent.category.DEFAULT\" />"}<br/>
          {"  <data android:scheme=\"https\" />"}<br/>
          {"</intent-filter>"}
        </div>
        <p className="text-xs text-gray-400 mt-2">→ This makes your Activity respond to any https:// link click.</p>
      </Card>
    </div>
  ),

  misc: () => (
    <div>
      <Card title="Content Provider — Sharing Data Across Apps" color="purple">
        <div className="flex gap-2 items-center text-xs text-gray-300 mb-3">
          <div className="bg-purple-800 rounded p-2 text-center flex-1">App A<br/><span className="text-gray-400">(has data)</span></div>
          <div className="text-gray-400 text-center">→ ContentProvider →<br/><span className="text-purple-300">ContentResolver</span></div>
          <div className="bg-blue-800 rounded p-2 text-center flex-1">App B<br/><span className="text-gray-400">(reads data)</span></div>
        </div>
        <p className="text-xs text-gray-400">App B calls <span className="text-purple-300 font-mono">getContentResolver().query()</span> → returns a <span className="text-green-300 font-mono">Cursor</span> → reads rows/columns.</p>
      </Card>

      <Card title="Broadcast Receivers" color="yellow">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-800 rounded p-2">
            <div className="text-yellow-300 font-bold">Static (Manifest)</div>
            <div className="text-gray-300 mt-1">Declared in AndroidManifest. Works even when app isn't running.</div>
          </div>
          <div className="bg-gray-800 rounded p-2">
            <div className="text-green-300 font-bold">Dynamic (Code)</div>
            <div className="text-gray-300 mt-1">Registered/unregistered in code. Only active while app is alive.</div>
          </div>
        </div>
        <div className="mt-2 text-xs text-gray-400">Common triggers: <Badge text="BATTERY_LOW" color="yellow" /> <Badge text="CONNECTIVITY_CHANGE" color="blue" /> <Badge text="BOOT_COMPLETED" color="green" /></div>
      </Card>

      <Card title="JobScheduler — Smart Background Work" color="orange">
        <p className="text-xs text-gray-300 mb-2">Instead of running a task immediately, you tell the system <em>conditions</em> under which to run it.</p>
        <div className="grid grid-cols-3 gap-2 text-xs text-center">
          {[
            { icon: "📶", label: "Network available" },
            { icon: "🔌", label: "Device charging" },
            { icon: "💤", label: "Device idle" },
          ].map((c, i) => (
            <div key={i} className="bg-orange-900/50 rounded p-2 border border-orange-600">
              <div className="text-2xl">{c.icon}</div>
              <div className="text-orange-200">{c.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">Available since API 21. Modern replacement: <span className="text-orange-300 font-bold">WorkManager</span> (wraps JobScheduler + more).</p>
      </Card>

      <Card title="onTrimMemory() — Memory Pressure Callback" color="red">
        <p className="text-xs text-gray-300 mb-2">Android calls this when it needs memory back. You respond by releasing caches or bitmaps.</p>
        <div className="flex gap-1 flex-wrap">
          <Badge text="RUNNING_MODERATE" color="green" />
          <Badge text="RUNNING_LOW" color="yellow" />
          <Badge text="RUNNING_CRITICAL" color="red" />
          <Badge text="BACKGROUND" color="gray" />
          <Badge text="COMPLETE" color="purple" />
        </div>
        <p className="text-xs text-gray-400 mt-2">Higher severity = more urgency. Release non-critical resources early to avoid being killed.</p>
      </Card>
    </div>
  ),
};

export default function App() {
  const [active, setActive] = useState("architecture");

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Android Basics</h1>
          <p className="text-gray-400 text-sm mt-1">Part 1 — Visual Study Guide</p>
        </div>

        {/* Nav */}
        <div className="flex flex-wrap gap-2 mb-6">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                active === s.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {sections_content[active]?.()}
        </div>
      </div>
    </div>
  );
}