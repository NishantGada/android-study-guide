import { useState } from "react";

// ─── SHARED UI COMPONENTS ───────────────────────────────────────────────────

const Card = ({ title, children, color = "indigo" }) => {
  const border = { indigo:"border-indigo-500/40 bg-indigo-950/30", green:"border-green-500/40 bg-green-950/30", yellow:"border-yellow-500/40 bg-yellow-950/30", red:"border-red-500/40 bg-red-950/30", blue:"border-blue-500/40 bg-blue-950/30", purple:"border-purple-500/40 bg-purple-950/30", orange:"border-orange-500/40 bg-orange-950/30", teal:"border-teal-500/40 bg-teal-950/30", cyan:"border-cyan-500/40 bg-cyan-950/30" };
  const title_c = { indigo:"text-indigo-300", green:"text-green-300", yellow:"text-yellow-300", red:"text-red-300", blue:"text-blue-300", purple:"text-purple-300", orange:"text-orange-300", teal:"text-teal-300", cyan:"text-cyan-300" };
  return (
    <div className={`rounded-xl border ${border[color]} p-4 mb-4`}>
      {title && <h3 className={`font-bold text-xs mb-3 uppercase tracking-widest ${title_c[color]}`}>{title}</h3>}
      {children}
    </div>
  );
};

const Badge = ({ text, color = "gray" }) => {
  const c = { gray:"bg-gray-700 text-gray-200", green:"bg-green-800 text-green-200", blue:"bg-blue-800 text-blue-200", red:"bg-red-800 text-red-200", yellow:"bg-yellow-800 text-yellow-200", purple:"bg-purple-800 text-purple-200", orange:"bg-orange-800 text-orange-200", teal:"bg-teal-800 text-teal-200" };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c[color]}`}>{text}</span>;
};

const Table = ({ headers, rows }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs rounded-lg overflow-hidden">
      <thead><tr className="bg-gray-700/80 text-gray-200">{headers.map((h,i)=><th key={i} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr></thead>
      <tbody>{rows.map((row,i)=><tr key={i} className={i%2===0?"bg-gray-800/50":"bg-gray-800/20"}>{row.map((cell,j)=><td key={j} className="px-3 py-2 text-gray-300">{cell}</td>)}</tr>)}</tbody>
    </table>
  </div>
);

const LifecycleFlow = ({ steps, colors }) => (
  <div className="flex flex-col items-center gap-0.5 my-2">
    {steps.map((s,i)=>(
      <div key={i} className="flex flex-col items-center w-full">
        <div className={`rounded-lg px-4 py-2 text-xs font-mono font-bold ${colors[i%colors.length]} text-white shadow w-full max-w-xs text-center`}>{s.name}</div>
        {s.note && <div className="text-xs text-gray-400 italic mt-0.5 mb-0.5 text-center max-w-xs px-2">{s.note}</div>}
        {i<steps.length-1 && <div className="text-gray-600 text-base leading-none">↓</div>}
      </div>
    ))}
  </div>
);

const ConnectsTo = ({ items }) => (
  <div className="mt-3 pt-3 border-t border-gray-700/50">
    <div className="text-xs text-gray-500 mb-1.5 uppercase tracking-wider">🔗 Connects to</div>
    <div className="flex flex-wrap gap-1.5">
      {items.map((item,i)=>(
        <span key={i} className="text-xs bg-gray-700/60 text-gray-300 px-2 py-0.5 rounded-full border border-gray-600/40">{item}</span>
      ))}
    </div>
  </div>
);

const Callout = ({ type="tip", children }) => {
  const styles = { tip:"border-blue-500/40 bg-blue-950/20 text-blue-200", warn:"border-yellow-500/40 bg-yellow-950/20 text-yellow-200", danger:"border-red-500/40 bg-red-950/20 text-red-200" };
  const icons = { tip:"💡", warn:"⚠️", danger:"🚨" };
  return <div className={`rounded-lg border px-3 py-2 text-xs mt-2 ${styles[type]}`}>{icons[type]} {children}</div>;
};

// ─── PART 1 CONTENT ─────────────────────────────────────────────────────────

const part1Sections = [
  {
    id:"architecture", label:"🏗️ Architecture",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Before writing a single line of Android code, you need to understand the mental model. Android isn't just Java/Kotlin — it's a layered system where your code runs inside a managed environment.</p>
        <Card title="The App Stack — Top to Bottom" color="indigo">
          <div className="space-y-1.5">
            {[
              { layer:"Your App Code", desc:"Activities, Fragments, ViewModels, Repositories", icon:"🏠", bg:"bg-indigo-800/70" },
              { layer:"Application Class", desc:"First thing instantiated when your process starts. Sets up global state, DI graphs, analytics SDKs.", icon:"🧬", bg:"bg-blue-800/70" },
              { layer:"Context", desc:"Your app's passport to the Android system — access resources, databases, preferences, and system services.", icon:"🔑", bg:"bg-cyan-800/70" },
              { layer:"Android Framework", desc:"Activity Manager, Window Manager, Content Providers, Notification Manager…", icon:"⚙️", bg:"bg-teal-800/70" },
              { layer:"Linux Kernel", desc:"Memory management, process isolation, hardware drivers. Each app runs in its own process sandbox.", icon:"🐧", bg:"bg-gray-700/70" },
            ].map((l,i)=>(
              <div key={i} className={`${l.bg} rounded-lg px-4 py-2.5 flex items-center gap-3`}>
                <span className="text-xl">{l.icon}</span>
                <div><div className="text-white font-semibold text-sm">{l.layer}</div><div className="text-gray-300 text-xs mt-0.5">{l.desc}</div></div>
              </div>
            ))}
          </div>
          <ConnectsTo items={["Application Class → Part 1: Services", "Context → Part 1: Activities & Fragments", "Framework → Part 2: Advanced APIs"]} />
        </Card>
        <Card title="Context: Two Flavors" color="blue">
          <p className="text-xs text-gray-400 mb-2">Context is one of the most misused concepts in Android. Using the wrong one causes memory leaks.</p>
          <Table
            headers={["Type","Tied To","Use When","Avoid When"]}
            rows={[
              ["Application Context","App lifecycle (entire app life)","Singletons, DI setup, app-wide resources","Showing dialogs, inflating views"],
              ["Activity Context","Activity lifecycle","UI ops, dialogs, layouts, views","Long-lived objects (causes leaks!)"],
            ]}
          />
          <Callout type="danger">Holding an Activity Context in a static field or singleton = memory leak. The Activity can't be GC'd even after it's destroyed.</Callout>
          <ConnectsTo items={["Activity Lifecycle → Part 1: Activity", "Memory Leaks → Part 2: Expert concepts"]} />
        </Card>
      </div>
    )
  },
  {
    id:"components", label:"🧱 4 Components",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Every Android app is composed of exactly these 4 building blocks. The system knows about them through <span className="text-yellow-300 font-mono">AndroidManifest.xml</span> — if it's not declared there, Android doesn't know it exists.</p>
        <div className="space-y-3 mb-4">
          {[
            { icon:"📱", name:"Activity", color:"bg-indigo-800/70", border:"border-indigo-500/30", desc:"A single screen with a user interface. The entry point for user interaction.", analogy:"A page in a book", note:"Most apps have multiple activities. One is the launcher entry point." },
            { icon:"⚙️", name:"Service", color:"bg-green-800/70", border:"border-green-500/30", desc:"Background work with no UI — music, downloads, data sync, location tracking.", analogy:"A worker in a back room", note:"Doesn't die when user navigates away from the app." },
            { icon:"📡", name:"Broadcast Receiver", color:"bg-yellow-800/70", border:"border-yellow-500/30", desc:"Listens for system-wide events: battery low, screen on, network change, boot completed.", analogy:"A smoke detector", note:"Lightweight — do minimal work here. Kick off a Service for heavy tasks." },
            { icon:"🗄️", name:"Content Provider", color:"bg-purple-800/70", border:"border-purple-500/30", desc:"Structured data sharing between apps. Powers Contacts, MediaStore, Calendar.", analogy:"A shared database with a security guard", note:"Your app queries it via ContentResolver, not directly." },
          ].map((c,i)=>(
            <div key={i} className={`${c.color} border ${c.border} rounded-xl p-3`}>
              <div className="flex gap-3 items-start">
                <span className="text-3xl">{c.icon}</span>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">{c.name}</div>
                  <div className="text-gray-200 text-xs mt-0.5">{c.desc}</div>
                  <div className="flex gap-2 mt-1.5 flex-wrap">
                    <span className="text-gray-400 text-xs italic">"{c.analogy}"</span>
                    <span className="text-gray-300 text-xs">→ {c.note}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Callout type="tip">All 4 components are declared in AndroidManifest.xml. The system reads this file to understand what your app can do — before it even launches.</Callout>
      </div>
    )
  },
  {
    id:"activity", label:"📱 Activity",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Activity is the most important component to master. Its lifecycle drives nearly every UI decision you'll make.</p>
        <Card title="Activity Lifecycle — Full Flow" color="indigo">
          <div className="flex gap-4">
            <div className="flex-1">
              <LifecycleFlow
                steps={[
                  { name:"onCreate()", note:"First call. Set layout, init ViewModel, restore state. Runs once per instance." },
                  { name:"onStart()", note:"Visible but not interactive. Register UI-related listeners." },
                  { name:"onResume()", note:"🟢 Foreground. User can interact. Start animations, camera." },
                  { name:"onPause()", note:"Partially obscured. Save lightweight state. Release camera/sensors." },
                  { name:"onStop()", note:"Fully hidden. Release heavy resources. Stop animations." },
                  { name:"onDestroy()", note:"Being killed. Final cleanup. Called on rotation too." },
                ]}
                colors={["bg-indigo-600","bg-blue-600","bg-green-600","bg-yellow-600","bg-orange-600","bg-red-700"]}
              />
            </div>
            <div className="w-px bg-gray-700/60 mx-1"/>
            <div className="flex-1 flex flex-col gap-2 justify-center text-xs text-gray-300">
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-green-400 font-bold font-mono">onRestart()</span><div className="text-gray-400 mt-0.5">Called between onStop → onStart when user comes back to the app.</div></div>
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-yellow-400 font-bold font-mono">onSaveInstanceState()</span><div className="text-gray-400 mt-0.5">Save UI state before pause. Bundle survives process death.</div></div>
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-blue-400 font-bold font-mono">onRestoreInstanceState()</span><div className="text-gray-400 mt-0.5">Only called when Activity is recreated — not on fresh start.</div></div>
              <Callout type="warn">Screen rotation → onDestroy() + onCreate(). Always handle this with ViewModel to survive config changes.</Callout>
            </div>
          </div>
          <ConnectsTo items={["ViewModel survives rotation → Part 2", "Fragment shares Activity lifecycle", "setContentView() only in onCreate()"]} />
        </Card>
        <Card title="Launch Modes — How Activities Stack" color="purple">
          <p className="text-xs text-gray-400 mb-2">Controls how Android creates or reuses Activity instances in the back stack.</p>
          <Table
            headers={["Mode","New instance?","Stack behavior","Best for"]}
            rows={[
              ["standard","Always","Stacks on top every time","Most activities (default)"],
              ["singleTop","Only if not on top","Reuses top → onNewIntent()","Search, notifications"],
              ["singleTask","Only if not in task","Clears everything above it","Home/main activity"],
              ["singleInstance","Always in own task","Completely isolated","Launcher, dialer"],
            ]}
          />
          <Callout type="tip">Think of the back stack like a literal stack of cards. Standard = always add a card. SingleTop = reuse if it's the top card. SingleTask = clear cards above. SingleInstance = separate deck entirely.</Callout>
        </Card>
        <Card title="Clearing the Back Stack with Flags" color="yellow">
          <Table
            headers={["Flag","What it does","Pair with"]}
            rows={[
              ["FLAG_ACTIVITY_CLEAR_TOP","Clears everything above the existing instance. That instance becomes root.","FLAG_ACTIVITY_NEW_TASK (optional)"],
              ["FLAG_ACTIVITY_CLEAR_TASK","Wipes the entire task first. New Activity becomes the only entry.","FLAG_ACTIVITY_NEW_TASK (required)"],
            ]}
          />
        </Card>
      </div>
    )
  },
  {
    id:"fragment", label:"🧩 Fragment",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Fragments let you build modular, reusable UI pieces. Think of them as "sub-activities" — they have their own lifecycle but always live inside a host Activity.</p>
        <Card title="Activity vs Fragment — Mental Model" color="green">
          <Table
            headers={["","Activity","Fragment"]}
            rows={[
              ["Has own UI?","✅ Yes","✅ Yes (can return null too)"],
              ["Lives independently?","✅ Yes","❌ Must be hosted by Activity"],
              ["Lifecycle owner","Android system","Host Activity"],
              ["Reusable across screens?","❌ Not really","✅ Core purpose"],
              ["Added/removed at runtime?","❌ Complex","✅ FragmentManager handles it"],
              ["Can communicate with host?","—","✅ Via ViewModel or interface"],
            ]}
          />
          <ConnectsTo items={["FragmentManager → Part 2", "ViewModel shared between Fragment+Activity → Part 2", "Navigation Component → Part 2"]} />
        </Card>
        <Card title="Fragment Lifecycle" color="blue">
          <div className="flex gap-4">
            <div className="flex-1">
              <LifecycleFlow
                steps={[
                  { name:"onAttach()", note:"Fragment gets reference to host Activity." },
                  { name:"onCreate()", note:"Init non-UI data. Don't touch views yet." },
                  { name:"onCreateView()", note:"Inflate and return your layout." },
                  { name:"onActivityCreated()", note:"Activity fully ready. Safe to call findViewById()." },
                  { name:"onStart() → onResume()", note:"🟢 Visible and interactive." },
                  { name:"onPause() → onStop()", note:"Losing focus/visibility." },
                  { name:"onDestroyView()", note:"View hierarchy gone. Release view references here." },
                  { name:"onDestroy()", note:"Final cleanup." },
                  { name:"onDetach()", note:"Disconnected from Activity." },
                ]}
                colors={["bg-teal-700","bg-cyan-700","bg-blue-600","bg-indigo-600","bg-green-600","bg-yellow-600","bg-orange-600","bg-red-700","bg-gray-600"]}
              />
            </div>
            <div className="w-px bg-gray-700/60 mx-1"/>
            <div className="flex-1 text-xs text-gray-400 flex flex-col gap-2 justify-center">
              <Callout type="warn">Never store view references beyond onDestroyView(). The view is gone but the Fragment instance may still be alive — this causes leaks.</Callout>
              <Callout type="tip">Use ViewBinding or Databinding and null out the binding in onDestroyView() to be safe.</Callout>
              <div className="bg-gray-800/60 rounded p-2 border border-gray-700/40"><span className="text-purple-300 font-bold">Retained Fragment</span><div className="mt-0.5 text-gray-400">Call setRetainInstance(true) → Fragment survives rotation. Data preserved, views still recreated.</div></div>
            </div>
          </div>
        </Card>
        <Card title="add() vs replace() in FragmentManager" color="orange">
          <Table
            headers={["","add()","replace()"]}
            rows={[
              ["Previous fragment","Stays alive in background","Destroyed (onDestroyView called)"],
              ["Back press behavior","Previous reappears instantly","Previous fragment recreated fresh"],
              ["Lifecycle events","Not fired on existing fragment","Full lifecycle fired on swap"],
              ["Memory","Higher (both in memory)","Lower (only current in memory)"],
              ["Use when","Overlapping UI (tabs, overlays)","Full screen swap (navigation)"],
            ]}
          />
          <Callout type="tip">Modern apps use the Navigation Component which handles all of this for you — you rarely manage FragmentManager manually anymore.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"services", label:"⚙️ Services",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Services handle work that should continue regardless of whether the user is looking at your app. As Android evolved, so did the rules around what services can do in the background.</p>
        <Card title="3 Types of Services" color="green">
          <div className="space-y-2">
            {[
              { name:"Foreground Service", icon:"🔔", color:"bg-green-800/70", border:"border-green-500/30", desc:"User-visible via persistent notification. High priority — system rarely kills it.", ex:"Music player, GPS navigation, fitness tracking", when:"User is actively aware of the task" },
              { name:"Background Service", icon:"🌑", color:"bg-gray-700/70", border:"border-gray-500/30", desc:"Invisible. Heavily restricted since Android 8.0 (Oreo) to save battery. Use WorkManager.", ex:"Syncing data (legacy)", when:"⚠️ Prefer WorkManager for modern apps" },
              { name:"Bound Service", icon:"🔗", color:"bg-blue-800/70", border:"border-blue-500/30", desc:"Components bind to it via IBinder for two-way communication. Lives only as long as clients are bound.", ex:"Bluetooth communication, real-time data feed", when:"Activity needs to talk to the service" },
            ].map((s,i)=>(
              <div key={i} className={`${s.color} border ${s.border} rounded-lg p-3`}>
                <div className="flex items-center gap-2 mb-1"><span>{s.icon}</span><span className="font-bold text-white text-sm">{s.name}</span></div>
                <div className="text-gray-200 text-xs">{s.desc}</div>
                <div className="flex gap-4 mt-1.5 text-xs"><span className="text-gray-400">e.g. {s.ex}</span></div>
                <div className="text-xs mt-1 text-gray-300">Use when: {s.when}</div>
              </div>
            ))}
          </div>
          <ConnectsTo items={["WorkManager replaces Background Service", "Foreground Service → Notification required", "Bound Service → IBinder interface"]} />
        </Card>
        <Card title="Service Variants Compared" color="blue">
          <Table
            headers={["","Service","IntentService","JobIntentService"]}
            rows={[
              ["Thread","Main (UI) thread ⚠️","Worker thread ✅","Worker thread ✅"],
              ["Multiple tasks","Yes, manually managed","Sequential queue","Sequential queue"],
              ["Auto-stops?","No — you call stopSelf()","Yes, when queue empty","Yes, when queue empty"],
              ["Survives Oreo+","Partly","No","Yes — uses JobScheduler"],
              ["Ideal for","Long running + interaction","Short one-off tasks","Guaranteed deferred tasks"],
            ]}
          />
          <Callout type="warn">IntentService is deprecated in API 30. Use WorkManager for background tasks — it's the modern, battery-friendly replacement for all of these.</Callout>
        </Card>
        <Card title="Service Lifecycle Methods" color="purple">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { m:"onCreate()", d:"Called once when service is first created. Init connections, threads.", c:"text-purple-300" },
              { m:"onStartCommand()", d:"Called each time startService() is called. Return START_STICKY to auto-restart.", c:"text-blue-300" },
              { m:"onBind()", d:"Return IBinder for bound service. Return null if not a bound service.", c:"text-green-300" },
              { m:"onUnbind()", d:"All clients have unbound. Override to clean up.", c:"text-yellow-300" },
              { m:"onDestroy()", d:"Final cleanup — stop threads, release resources.", c:"text-red-300" },
            ].map((item,i)=>(
              <div key={i} className="bg-gray-800/50 rounded p-2 border border-gray-700/30">
                <div className={`${item.c} font-mono font-bold`}>{item.m}</div>
                <div className="mt-0.5 text-gray-400">{item.d}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="JobScheduler — Smart Background Scheduling" color="orange">
          <p className="text-xs text-gray-400 mb-2">Instead of running immediately, you define conditions. Android batches these jobs for battery efficiency. Available since API 21.</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-center mb-2">
            {[{icon:"📶",label:"Network available"},{icon:"🔌",label:"Charging"},{icon:"💤",label:"Device idle"}].map((c,i)=>(
              <div key={i} className="bg-orange-900/40 rounded p-2 border border-orange-600/30"><div className="text-2xl">{c.icon}</div><div className="text-orange-200 mt-1">{c.label}</div></div>
            ))}
          </div>
          <Callout type="tip">Modern recommendation: use <strong>WorkManager</strong> — it wraps JobScheduler, AlarmManager, and JobDispatcher under one API and works across all API levels.</Callout>
        </Card>
      </div>
    )
  },
  {
    id:"intents", label:"📨 Intents",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">Intents are Android's messaging system. They're how components talk to each other — within your app and across apps.</p>
        <Card title="Explicit vs Implicit" color="indigo">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="bg-indigo-900/50 rounded-lg p-3 text-xs border border-indigo-500/30">
              <div className="text-indigo-300 font-bold mb-1">Explicit Intent</div>
              <div className="text-gray-300">You name the exact target component. Used within your own app.</div>
              <div className="bg-gray-900/60 rounded mt-2 p-2 font-mono text-green-300 text-xs">Intent(this,<br/>  DetailActivity::class.java)</div>
              <div className="text-gray-400 mt-1.5">→ Go to this specific screen</div>
            </div>
            <div className="bg-blue-900/50 rounded-lg p-3 text-xs border border-blue-500/30">
              <div className="text-blue-300 font-bold mb-1">Implicit Intent</div>
              <div className="text-gray-300">Declare an action. Android finds the right app to handle it.</div>
              <div className="bg-gray-900/60 rounded mt-2 p-2 font-mono text-green-300 text-xs">Intent(ACTION_SEND)<br/>.apply {"{ type = \"text/plain\" }"}</div>
              <div className="text-gray-400 mt-1.5">→ Share sheet appears</div>
            </div>
          </div>
          <ConnectsTo items={["Intent Filters define what implicit intents a component accepts", "PendingIntent wraps intents for deferred execution"]} />
        </Card>
        <Card title="Intent Anatomy — 6 Parts" color="blue">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { part:"Action", desc:'What to do — ACTION_VIEW, ACTION_SEND, ACTION_DIAL', color:"text-blue-300", icon:"🎬" },
              { part:"Data (URI)", desc:"What to act on — content://contacts/1, https://...", color:"text-green-300", icon:"📎" },
              { part:"Category", desc:"Additional context — CATEGORY_LAUNCHER, CATEGORY_APP_BROWSER", color:"text-yellow-300", icon:"🏷️" },
              { part:"Extras (Bundle)", desc:"Key-value pairs passed along with the intent", color:"text-purple-300", icon:"📦" },
              { part:"Component", desc:"Explicit target class name (explicit intents only)", color:"text-red-300", icon:"🎯" },
              { part:"Flags", desc:"Modify behavior — CLEAR_TOP, NEW_TASK, SINGLE_TOP", color:"text-orange-300", icon:"🚩" },
            ].map((item,i)=>(
              <div key={i} className="bg-gray-800/50 rounded p-2 border border-gray-700/30">
                <div className={`${item.color} font-bold`}>{item.icon} {item.part}</div>
                <div className="text-gray-400 mt-0.5">{item.desc}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="3 Intent Flavors" color="green">
          <Table
            headers={["Type","What it is","Common use case"]}
            rows={[
              ["Regular Intent","Fire-and-forget message","Start activity, launch service"],
              ["Sticky Intent","Broadcast that persists in system","Legacy — avoid, use LiveData/StateFlow instead"],
              ["Pending Intent","Deferred intent executed by another app/system","Notifications, AlarmManager, Geofences"],
            ]}
          />
          <Callout type="tip">PendingIntent is essentially saying: "Here's a pre-authorized action that someone else can fire on my behalf later." Notifications use this to open your app when tapped.</Callout>
        </Card>
        <Card title="Intent Filters — Advertise What You Accept" color="yellow">
          <p className="text-xs text-gray-400 mb-2">Declared in AndroidManifest.xml. Tells Android: "my component can handle this kind of implicit intent."</p>
          <div className="bg-gray-900/80 rounded p-3 font-mono text-xs text-green-300 border border-gray-700/40">
            {"<intent-filter>"}<br/>
            {"  <action android:name=\"android.intent.action.VIEW\" />"}<br/>
            {"  <category android:name=\"android.intent.category.DEFAULT\" />"}<br/>
            {"  <data android:scheme=\"https\" />"}<br/>
            {"</intent-filter>"}
          </div>
          <p className="text-xs text-gray-400 mt-2">↑ This makes your Activity respond to any https:// link tap in the system.</p>
        </Card>
      </div>
    )
  },
  {
    id:"misc", label:"🔧 Misc",
    content: () => (
      <div>
        <p className="text-gray-400 text-xs mb-4">These concepts round out the core Android basics — they don't fit neatly into one component but are critical in real-world apps.</p>
        <Card title="Content Provider — Structured Data Sharing" color="purple">
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-3 flex-wrap">
            <div className="bg-purple-800/60 rounded p-2 text-center border border-purple-500/30"><div className="font-bold text-white">Your App</div><div className="text-gray-400">(has data)</div></div>
            <div className="text-gray-500 text-center">→ ContentProvider →</div>
            <div className="bg-gray-700/60 rounded p-2 text-center border border-gray-600/30 text-purple-300 font-mono text-xs">ContentResolver<br/>.query(URI)</div>
            <div className="text-gray-500 text-center">→</div>
            <div className="bg-blue-800/60 rounded p-2 text-center border border-blue-500/30"><div className="font-bold text-white">Other App</div><div className="text-gray-400">(reads data)</div></div>
          </div>
          <p className="text-xs text-gray-400">The Cursor returned works like a database result set — iterate rows, read columns. Android's Contacts, MediaStore, and Calendar all work this way.</p>
          <ConnectsTo items={["Room DB can be exposed via ContentProvider", "FileProvider is a ContentProvider for sharing files", "Used with CursorLoader (legacy) / Paging (modern)"]} />
        </Card>
        <Card title="Broadcast Receivers" color="yellow">
          <Table
            headers={["","Static (Manifest)","Dynamic (Code)"]}
            rows={[
              ["Registered in","AndroidManifest.xml","registerReceiver() in code"],
              ["Active when","Even if app not running","Only while app is alive"],
              ["Unregister needed?","No","Yes — in onStop/onDestroy"],
              ["Post-Android 8 restrictions","Many implicit broadcasts blocked","Works fine"],
            ]}
          />
          <div className="mt-2 flex flex-wrap gap-1.5 items-center text-xs text-gray-400">Common events: <Badge text="BATTERY_LOW" color="yellow" /> <Badge text="CONNECTIVITY_CHANGE" color="blue" /> <Badge text="BOOT_COMPLETED" color="green" /> <Badge text="SMS_RECEIVED" color="purple" /></div>
          <Callout type="warn">Keep BroadcastReceiver logic minimal — it runs on the main thread and has a strict time limit. Delegate heavy work to a Service or WorkManager.</Callout>
        </Card>
        <Card title="onTrimMemory() — Respond to Memory Pressure" color="red">
          <p className="text-xs text-gray-400 mb-2">Android calls this on your Application/Activity when it needs memory back. You respond by releasing caches, bitmaps, or other non-critical resources.</p>
          <div className="space-y-1 text-xs">
            {[
              { level:"RUNNING_MODERATE", color:"text-green-400", desc:"App in foreground, system under moderate pressure" },
              { level:"RUNNING_LOW", color:"text-yellow-400", desc:"System is low on memory — start releasing" },
              { level:"RUNNING_CRITICAL", color:"text-orange-400", desc:"Critical — release everything you can or get killed" },
              { level:"BACKGROUND", color:"text-red-400", desc:"App in background — release to avoid being killed" },
            ].map((l,i)=><div key={i} className="flex gap-2 items-start"><span className={`${l.color} font-mono font-bold w-40 shrink-0`}>{l.level}</span><span className="text-gray-400">{l.desc}</span></div>)}
          </div>
          <ConnectsTo items={["LruCache responds to onTrimMemory → Part 2", "Memory profiling → Android Studio tools"]} />
        </Card>
      </div>
    )
  }
];

// ─── PART DEFINITIONS ────────────────────────────────────────────────────────

const PARTS = [
  {
    id: "p1",
    label: "Part 1",
    title: "Android Basics",
    color: "indigo",
    emoji: "📘",
    sections: part1Sections,
  },
  // Future parts plug in here
];

// ─── PROGRESS TRACKER ────────────────────────────────────────────────────────

const getAllSectionKeys = () => PARTS.flatMap(p => p.sections.map(s => `${p.id}-${s.id}`));

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [activePart, setActivePart] = useState("p1");
  const [activeSection, setActiveSection] = useState("architecture");
  const [completed, setCompleted] = useState({});

  const currentPart = PARTS.find(p => p.id === activePart);
  const currentSection = currentPart?.sections.find(s => s.id === activeSection);
  const sectionKey = `${activePart}-${activeSection}`;
  const isDone = !!completed[sectionKey];

  const totalSections = PARTS.reduce((a, p) => a + p.sections.length, 0);
  const completedCount = Object.values(completed).filter(Boolean).length;
  const progressPct = Math.round((completedCount / totalSections) * 100);

  const toggleDone = () => setCompleted(prev => ({ ...prev, [sectionKey]: !prev[sectionKey] }));

  const goNext = () => {
    const secs = currentPart.sections;
    const idx = secs.findIndex(s => s.id === activeSection);
    if (idx < secs.length - 1) {
      setActiveSection(secs[idx + 1].id);
    } else {
      const partIdx = PARTS.findIndex(p => p.id === activePart);
      if (partIdx < PARTS.length - 1) {
        const nextPart = PARTS[partIdx + 1];
        setActivePart(nextPart.id);
        setActiveSection(nextPart.sections[0].id);
      }
    }
  };

  const goPrev = () => {
    const secs = currentPart.sections;
    const idx = secs.findIndex(s => s.id === activeSection);
    if (idx > 0) {
      setActiveSection(secs[idx - 1].id);
    } else {
      const partIdx = PARTS.findIndex(p => p.id === activePart);
      if (partIdx > 0) {
        const prevPart = PARTS[partIdx - 1];
        setActivePart(prevPart.id);
        setActiveSection(prevPart.sections[prevPart.sections.length - 1].id);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-bold text-white">Android Dev — Study Guide</h1>
            <span className="text-xs text-gray-400">{completedCount}/{totalSections} sections done</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-1.5">
            <div className="bg-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>

        {/* Part Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {PARTS.map(p => (
            <button key={p.id} onClick={() => { setActivePart(p.id); setActiveSection(p.sections[0].id); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${activePart === p.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}>
              <span>{p.emoji}</span>{p.label}: {p.title}
            </button>
          ))}
          <div className="px-3 py-1.5 rounded-lg text-xs text-gray-600 bg-gray-800/40 border border-gray-700/30 border-dashed whitespace-nowrap">+ More coming</div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {currentPart?.sections.map(s => {
            const key = `${activePart}-${s.id}`;
            const done = !!completed[key];
            return (
              <button key={s.id} onClick={() => setActiveSection(s.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${activeSection === s.id ? "bg-indigo-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"} ${done ? "opacity-60" : ""}`}>
                {done && <span className="text-green-400 text-xs">✓</span>}
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Section Content */}
        <div className="mb-4">
          {currentSection?.content()}
        </div>

        {/* Footer Nav */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-800">
          <button onClick={goPrev} className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">← Prev</button>
          <button onClick={toggleDone}
            className={`text-xs px-4 py-1.5 rounded-lg font-semibold transition-all ${isDone ? "bg-green-700 text-green-100 hover:bg-green-800" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}>
            {isDone ? "✓ Marked Done" : "Mark as Done"}
          </button>
          <button onClick={goNext} className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-800">Next →</button>
        </div>

      </div>
    </div>
  );
}